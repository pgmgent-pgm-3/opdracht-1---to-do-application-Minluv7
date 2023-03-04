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

  res.render("home", data, { categorieData, todoData });
};
