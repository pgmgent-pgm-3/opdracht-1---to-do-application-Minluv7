import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Categorie",
  tableName: "categorie",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    todo: {
      target: "Todo",
      type: "one-to-many",
      inverseSide: "owner",
      cascade: true,
    },
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
});
