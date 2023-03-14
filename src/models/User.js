import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    todos: {
      target: "Todo",
      type: "one-to-many",
      inverseSide: "user",
      cascade: true,
    },
    categories: {
      target: "Categorie",
      type: "one-to-many",
      inverseSide: "user",
      cascade: true,
    },
  },
});
