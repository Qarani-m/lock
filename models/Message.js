const fs = require('fs').promises;
const path = require('path');

class Message {
    constructor() {
        this.messagesFile = path.join(__dirname, '../data/messages.json');
    }

    async readAll() {
        try {
            const data = await fs.readFile(this.messagesFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    async save(message) {
        const messages = await this.readAll();
        messages.push(message);
        await fs.writeFile(this.messagesFile, JSON.stringify(messages, null, 2));
        return message;
    }
}

module.exports = new Message();
