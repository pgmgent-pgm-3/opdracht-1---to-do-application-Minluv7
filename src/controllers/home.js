/**
 * A home controller
 */
import DataSource from "../lib/DataSource.js";

import data from "../data/data.js";

export const home = async (req, res) => {
  const todoRepo = DataSource.getRepository("Todo");
  const categorieRepo = DataSource.getRepository("Categorie");
  //const userRepository = DataSource.getRepository("User");

  const categorieData = await categorieRepo.find();
  const todoData = await todoRepo.findOneBy({ id: 1 });
  // const allTodos = await todoRepo.find({
  //   where: {
  //     "user.id": id, // id of the user that is logged in
  //   },
  // });
  // console.log(allTodos);

  // const userData = await userRepository.findOne({
  //   where: { userData },
  // });

  res.render("home", {
    ...data,
    nav_items: categorieData,
    todoData,
    user: req.user,
  });
};

export const categoryTodos = async (req, res) => {
  // get the id with destructuring
  const { id } = req.params;

  const todoRepo = DataSource.getRepository("Todo");
  const categorieRepo = DataSource.getRepository("Categorie");

  const categorieData = await categorieRepo.find({
    where: { "user.id": 3 },
  });

  console.log(categorieData);

  const allTodosFromCategory = await todoRepo.find({
    where: {
      "owner.id": id,
      "user.id": 3,
    },
  });
  //req.send(allTodosFromCategory);
  console.log(allTodosFromCategory);

  //const todoData = await todoRepo.findOneBy({ id: 1 });

  res.render("home", {
    ...data,
    nav_items: categorieData,
    allTodosFromCategory,
    user: req.user,
  });
};
