const { User, Thought } = require('../models');
// resolver can accept four arguments in the following order:

// parent: This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to the resolver that executed the nested resolver function. We won't need this throughout the project, but we need to include it as the first argument.

// args: This is an object of all of the values passed into a query or mutation request as parameters. In our case, we destructure the username parameter out to be used.

// context: This will come into play later. If we were to need the same data to be accessible by all resolvers, such as a logged-in user's status or API access token, this data will come through this context parameter as an object.

// info: This will contain extra information about an operation's current state. This isn't used as frequently, but it can be implemented for more advanced uses.

const resolvers = {
  // Here, we pass in the parent as more of a placeholder parameter.
  // It won't be used, but we need something in that first parameter's spot
  // so we can access the username argument from the second parameter.
  //  We use a ternary operator to check if username exists.
  // If it does, we set params to an object with a username key set to that
  // value. If it doesn't, we simply return an empty object.
  // We then pass that object, with or without any data in it, to our .find() method
  // If there's data, it'll perform a lookup by a specific username.
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },

    // get user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  }
};

module.exports = resolvers;
