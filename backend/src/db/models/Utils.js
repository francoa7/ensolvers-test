module.exports = {
    invalidParams: function invalidParams(type, params) {
        const error = {};
        if (type === "user") {
            if (!params.username || params.username.length < 3)
                error.msg = "An invalid username was provided";
            else if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    params.email
                )
            )
                error.msg = "An invalid email was provided";
        } else if (type === "note") {
            if (!params.title || params.title.length < 3)
                error.msg = "Not a valid note title";
            else if (!params.description || params.description.length < 8)
                error.msg = "Not a valid note description";
        } else if (type === "category") {
            if (!params.name || params.name.length < 3) {
                error.msg = "Not a valid category name";
            }
        }
        if (error.msg) return error;
        else return false;
    },
};
