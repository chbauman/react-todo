import { useState } from "react";
import Select from "react-select";
import { useRegisteredRerender } from "../hooks/registerRerender";
import { undefinedToNull } from "../util/util";
import { globalTodoHandler } from "./TodoGroup";

type GroupSelectOption = { value: string; label: string };

export const GroupSelect = ({
  onChangeCB,
  id,
}: {
  onChangeCB: (newGroupId: string | null) => void;
  id?: string;
}) => {
  const datalist = globalTodoHandler.getAllGroups();
  const options = datalist.map((el) => {
    return { value: el.id, label: el.name };
  });

  useRegisteredRerender("groups-selection");

  const [selectedOption, setSelectedOption] =
    useState<GroupSelectOption | null>(null);
  const onChange = (el: GroupSelectOption | null) => {
    setSelectedOption(el);
    onChangeCB(undefinedToNull(el?.value));
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
      id={id}
    />
  );
};
