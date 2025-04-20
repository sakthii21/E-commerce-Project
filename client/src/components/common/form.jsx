import React from "react";
import Input from "@components/ui/Input.jsx";
import Label from "@components/ui/Label.jsx";
import Button from "@components/ui/Button.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import Textarea from "../ui/textarea";

function Form({
  formControls,
  formData,
  setFormData,
  onSubmit,
  ButtonText,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-sm"
          />
        );
        break;

      case "select":
        element = (
          <div className="w-full relative z-10">
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: value,
                })
              }
              value={value}
            >
              <SelectTrigger
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center justify-between text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <SelectValue placeholder={getControlItem.label} />
              </SelectTrigger>
              <SelectContent
                className="z-50 bg-white border border-gray-300 rounded-md shadow-lg"
                position="popper"
              >
                {getControlItem.options?.map((optionItem) => (
                  <SelectItem
                    key={optionItem.id}
                    value={optionItem.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    {optionItem.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="flex flex-col gap-1 w-full" key={controlItem.name}>
            <Label
              htmlFor={controlItem.name}
              className="text-sm font-medium text-gray-700"
            >
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full text-white">
        {ButtonText || "Submit"}
      </Button>
    </form>
  );
}

export default Form;
