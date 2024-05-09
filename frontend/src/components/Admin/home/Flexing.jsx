/* eslint-disable react/no-array-index-key */
import React from "react";
import Cards from "./Card";
import { Flex, Radio } from "antd";

const Flexing = () => {
  const [value, setValue] = React.useState("horizontal");
  return (
    <Flex gap="string" wrap="flex-wrap" vertical>
      <Radio.Group
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Radio.Group>
      <Flex vertical={value === "vertical"}>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </Flex>
    </Flex>
  );
};
export default Flexing;
