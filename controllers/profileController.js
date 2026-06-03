const axios = require('axios');
const db = require('../config/db');

const fetchAndSaveProfile = async (req, res) => {
    const { username } = req.params;

    try {
        // Setup headers to use the GitHub token if it exists (bypasses rate limits)
        const config = process.env.GITHUB_TOKEN 
            ? { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } } 
            : {};

        // Fetch user data from GitHub API using the token configuration
        const githubResponse = await axios.get(`https://api.github.com/users/${username}`, config);
        
        const insights = {
            username: githubResponse.data.login,
            name: githubResponse.data.name || null,
            public_repos: githubResponse.data.public_repos,
            followers: githubResponse.data.followers,
            following: githubResponse.data.following,
            bio: githubResponse.data.bio || null,
            profile_url: githubResponse.data.html_url
        };

        const query = `
            INSERT INTO github_profiles (username, name, public_repos, followers, following, bio, profile_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                public_repos = VALUES(public_repos),
                followers = VALUES(followers),
                following = VALUES(following),
                bio = VALUES(bio),
                profile_url = VALUES(profile_url);
        `;

        await db.execute(query, [
            insights.username,
            insights.name,
            insights.public_repos,
            insights.followers,
            insights.following,
            insights.bio,
            insights.profile_url
        ]);

        res.status(200).json({
            success: true,
            message: "Profile processed and saved successfully.",
            data: insights
        });

    } catch (error) {
        console.error("Error in fetchAndSaveProfile:", error.message);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ success: false, error: "GitHub user not found." });
        }
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM github_profiles ORDER BY created_at DESC');
        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("Error in getAllProfiles:", error.message);
        res.status(500).json({ success: false, error: "Failed to retrieve records." });
    }
};

const getProfileByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const [rows] = await db.execute('SELECT * FROM github_profiles WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: "Profile not found locally. Please fetch it first." 
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("Error in getProfileByUsername:", error.message);
        res.status(500).json({ success: false, error: "Failed to retrieve record." });
    }
};

module.exports = {
    fetchAndSaveProfile,
    getAllProfiles,
    getProfileByUsername
};