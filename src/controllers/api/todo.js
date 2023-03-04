import DataSource from "../../lib/DataSource.js";

export const getTodo = async (req, res, next) => {
  try {
    const todoRepository = DataSource.getRepository("Todo");
    const todos = await todoRepository.find();

    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
    });
  }
};

export const postTodo = async (req, res, next) => {
  try {
    const todoRepository = DataSource.getRepository("Todo");

    // get existing Todo (if there is one...)
    const todos = await todoRepository.findOneBy({
      name: req.body.name,
      done: req.body.done,
    });

    // if we have an Todo, return the existing one
    if (todos) {
      res.status(200).json({
        status: "Interest already exists in database",
      });
    } else {
      // if the Todo does not exist... create a new one in the database!
      await todoRepository.save(req.body);

      // let the client know that we added an entry
      res.status(201).json({
        status: "We create a new interest in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
      //   error: e.messege,
    });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    // get the id with destructuring
    const { id } = req.params;
    // get the user repository
    const todoRepository = DataSource.getRepository("Todo");

    // get the user with a specific id
    const todos = await todoRepository.findOneBy({ id });

    // does the user exist?
    if (todos) {
      // remove the user
      await todoRepository.delete(todos);
    }

    // send a response
    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
    });
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todoRepository = DataSource.getRepository("Todo");
    const todos = await todoRepository.findOneBy({ id: req.body.id });

    // change the name of the user
    // user.name = req.body.name;
    const newTodos = {
      ...todos,
      ...req.body,
    };

    // save the data in the database
    await todoRepository.save(newTodos);

    // give a response to the client
    res.status(200).json(newTodos);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!" + e.message,
    });
  }
};