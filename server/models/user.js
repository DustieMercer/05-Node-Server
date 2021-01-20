//email string null = false
//passowrd string null = false

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
    }
})
return user;
}