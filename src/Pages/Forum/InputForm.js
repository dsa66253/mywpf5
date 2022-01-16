import React, { useState } from "react";
import { useProfile } from "../../Hooks/useProfile.js";
import { Form, Input, Button, Radio, Space } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION } from "../../graphql/index.js";
// todo 可以做modify post
// type SizeType = Parameters<typeof Form>[0]['size'];

const InputForm = () => {
  // judge login or not?
  const { signIn, setSignIn, username } = useProfile();
  // InputForm start
  const [postType, setPostType] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = () => {
    // console.log(getCurrentTime());
    // console.log(postType=="" || title == "" || body == "");
    createPost({
      variables: {
        author: username,
        title: title,
        body: body,
        type: postType,
        date: getCurrentTime()
      },
    });
  };
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
      <Form.Item
        label="post type"
        name="size"
        rules={[{ required: true, message: "Choose a type" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setPostType(e.target.value);
          }}
          defaultValue={postType}
          value={postType}
        >
          <Space>
            <Radio.Button value="hount">hount</Radio.Button>
            <Radio.Button value="recruit">recruit</Radio.Button>
            <Radio.Button value="course">course</Radio.Button>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "title cannot be blank" }]}
      >
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          showCount
          maxLength={30}
        />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "content cannot be blank" }]}
      >
        {/* <Input /> */}
        <Input.TextArea
          onChange={(e) => {
            setBody(e.target.value);
          }}
          showCount
          maxLength={100}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button
          disabled={postType=="" || title == "" || body == "" ? true : false}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const getCurrentTime = () => {
  let Today = new Date();
  let yy = Today.getFullYear();
  let mm = Today.getMonth() + 1;
  let dd = Today.getDate();
  let h = Today.getHours();
  let m = Today.getMinutes();
  let s = Today.getSeconds();
  return `${yy}-${mm}-${dd} ${h}:${m}:${s}`;
};

export { InputForm };
