const fs = require('fs').promises;
const path = require('path');

class PPStatus {
    constructor() {
        this.statusFile = path.join(__dirname, '../data/payapl.json');
    }

    async readStatusFile() {
        try {
            const data = await fs.readFile(this.statusFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // If file doesn't exist, create default status
                const defaultStatus = {
                    isAppBlocked: false,
                    blockedUsers: []
                };
                await this.writeStatusFile(defaultStatus);
                return defaultStatus;
            }
            throw error;
        }
    }

    async writeStatusFile(status) {
        await fs.writeFile(this.statusFile, JSON.stringify(status, null, 2));
        return status;
    }

    async getStatus() {
        return await this.readStatusFile();
    }

    async toggleAppStatus() {
        const status = await this.readStatusFile();
        status.isAppBlocked = !status.isAppBlocked;
        return await this.writeStatusFile(status);
    }

    async addBlockedUser(userId, userEmail) {
        const status = await this.readStatusFile();
        
        // Check if user already exists
        const existingUser = status.blockedUsers.find(user => user.userId === userId);
        if (existingUser) {
            existingUser.isActive = true; // Reactivate user if they exist
        } else {
            status.blockedUsers.push({ userId, userEmail, isActive: true });
        }
        return await this.writeStatusFile(status);
    }

    async removeBlockedUser(userId) {
        const status = await this.readStatusFile();
        status.blockedUsers = status.blockedUsers.map(user =>
            user.userId === userId ? { ...user, isActive: false } : user
        );
        return await this.writeStatusFile(status);
    }
}

module.exports = new PPStatus();