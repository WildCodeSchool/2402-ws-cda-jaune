import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { IngredientInput } from "../../../backend/src/resolvers/types/IngredientInput";

const ADD_INGREDIENT = gql`
  mutation Mutation($ingredient: IngredientInput!) {
    addIngredient(ingredient: $ingredient) {
      id
      title
    }
  }
`;

export default function IngredientForm() {
  const [formState, setFormState] = useState<IngredientInput>({
    title: "",
  });

  const [addIngredient] = useMutation(ADD_INGREDIENT);

  const hChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const hSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log(formState);
    addIngredient({
      variables: {
        ingredient: formState,
      },
    });
  };

  return (
    <form onSubmit={hSubmit}>
      <label>
        Name
        <input type="text" name="title" onChange={hChange} />
      </label>
      <button>Save</button>
    </form>
  );
}
