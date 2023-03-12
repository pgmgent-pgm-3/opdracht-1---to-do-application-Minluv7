import DataSource from "../../lib/DataSource.js";
export const getUsers = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = DataSource.getRepository("User");

    // get the interests and return them with status code 200
    res.status(200).json(
      await userRepository.find({
        where: { id: null },
      })
    );
  } catch (e) {
    next(e.message);
  }
};
