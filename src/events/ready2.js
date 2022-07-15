
module.exports = {
    name: 'ready',
    async execute(client) {
        const activities = [
            `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users in ${client.guilds.cache.size} Servers!`,
            '/help for commands',
        ];
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * activities.length - 1) + 1;
            const newActivity = activities[randomIndex];

            client.user.setActivity(newActivity, {
                type: 'WATCHING'
            });
        }, 7000);



    },
};