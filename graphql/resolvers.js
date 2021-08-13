const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require('../models/user');
require("dotenv").config({ path: "./env/.env" });

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};
exports.resolvers = {
  RootQuery: {
    getUsers: async (root, args, { User }, info) => {
      const allUsers = await User.find();
      return allUsers;
    },
    getAllRecipes: async (root, args, { Recipe }, info) => {
      const allRecipes = await Recipe.find().sort({ createdDate: "desc" });
      // return { ...allRecipes._doc, _id: allRecipes._id.toString() }
      return allRecipes;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },
    getCurrentUser: async (tot, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: "favorites",
        model: "Recipe",
      });
      // console.log(user);
      return user;
    },
  },
  RootMutation: {
    addRecipe: async (
      root,
      { name, description, category, imageUrl, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        imageUrl,
        username,
      }).save();

      return newRecipe;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const userExists = await User.findOne({ username });
      if (userExists) throw new Error("User already exists");

      const user = await new User({
        username,
        email,
        password,
      });
      user.password = await bcrypt.hash(user.password, 10);

      user.save();

      return {
        token: createToken(user, process.env.JWT_SECRET, "1h"),
        userId: user.id,
      };
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        console.log(username, "; ", password);

        const newUser = await new User({
          username,
          password,
          email: username,
        });

        newUser.save();
        return {
          token: createToken(newUser, process.env.JWT_SECRET, "1h"),
          userId: newUser.id,
        };
      }

      // // if (!user) throw new Error("User not found!");

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Invalid Password");

      return {
        token: createToken(user, process.env.JWT_SECRET, "1h"),
        userId: user._id.toString(),
      };
    },
  },
};
