/**
 * A home controller
 */
import DataSource from "../lib/DataSource.js";

import data from "../data/data.js";

export const home = async (req, res) => {
  const todoRepo = DataSource.getRepository("Todo");
  const categorieRepo = DataSource.getRepository("Categorie");

  const categorieData = await categorieRepo.find();
  const todoData = await todoRepo.findOneBy({ id: 1 });

  res.render("home", { ...data, nav_items: categorieData, todoData });
};

export const categoryTodos = async (req, res) => {
  // get the id with destructuring
  const { id } = req.params;

  const todoRepo = DataSource.getRepository("Todo");
  const categorieRepo = DataSource.getRepository("Categorie");

  const categorieData = await categorieRepo.find();

  const allTodosFromCategory = await todoRepo.find({
    where: {
      "owner.id": id,
    },
  });
  //req.send(allTodosFromCategory);
  console.log(allTodosFromCategory);

  const todoData = await todoRepo.findOneBy({ id: 1 });

  res.render("home", {
    ...data,
    nav_items: categorieData,
    allTodosFromCategory,
  });
};
