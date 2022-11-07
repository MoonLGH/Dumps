// uses open-wa 
client.clientInstances.getGroupMembersId(message.chatId).then((getMemberIds) =>{
    const tagMembers = getMemberIds.filter(id => id !== message.sender.id)
    .map((id) => {
        id = "@" + id.replace('@c.us', '');
        return id;
    });
    client.clientInstances.sendTextWithMentions(message.chatId, tagMembers.join(' '));
})