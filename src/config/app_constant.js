const seckret_keys = {
    admin_seckret_key: "admin_seckret_key"
}

const scope = {
    super_admin: "super_admin",
    school_admin: "school_admin",
    teacher: "teacher",
    student: "student",
}

const salt_rounds = 10;

module.exports = {
    seckret_keys,
    scope,
    salt_rounds
};
