exports.parseError = (err) => {
    const errors = {
        messages: [],
    };

    if (Array.isArray(err)) {
        err.forEach(e => {
            errors.messages.push(e.msg);
        });
    } else if (err.name == 'ValidatorError') {
        for (const [field, e] of Object.entries(err.errors)) {
            errors.messages.push(e.message);
        }
    } else {
        errors.messages.push(err.message);
    }
    return errors.messages;
}

// Function to format post objects
exports.parsePost = (post, owner) => {
    return {
        _id: post._id,
        message: post.message,
        image: post.image,
        likes: post.likes,
        comments: post.comments,
        bookmarks: post.bookmarks,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        owner: {
            _id: owner._id,
            name: owner.name,
            surname: owner.surname,
            profilePicture: owner.profilePicture,
        },
    };
}
