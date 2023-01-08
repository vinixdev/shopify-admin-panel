import React from "react";
import { AttributeInterface } from "../category/context/CategoryReducer";
import InputField from "../SearchForm/Input/InputField";
import { ProductCategoryAtteribute } from "./interfaces/interfaces";

interface AtteributeProps {
  attr: ProductCategoryAtteribute;
  id: string;
  handler: (value: string, groupId: string, attrId: string) => void;
  val?: string;
}

export default function ProductGroupAtteribute({
  attr,
  id,
  handler,
  val = "",
}: AtteributeProps) {
  const [value, setValue] = React.useState<string>(val);
  const [error, setError] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   setValue(val);
  // }, []);

  return (
    <InputField
      onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setError(false);
        if (!e.target.value) {
          setError(true);
        }
        if (e.target.value) {
          handler(e.target.value, id, attr.id);
        }
      }}
      placeholder={attr.title}
      key={attr.id}
      value={value}
      error={error}
      required
    />
  );
}
