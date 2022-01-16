import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../Hooks/useProfile.js";
import defaultPortrait from "../../assets/portrait.png";
import {
  Card,
  Divider,
  Row,
  Col,
  Layout,
  Button,
  Modal,
  Form,
  Input,
  Tag,
} from "antd";
import { ALL_POSTS_QUERY, EDIT_POST_MUTATION, DELETE_POST_MUTATION } from "../../graphql/index.js";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { defaultPostArray } from "./defaultPostArray.js";
import { FormOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;

//todo 看有沒有需要改用antd's card

const Wrapper = styled.div`
  margin: 10px;
  margin-top: 10px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Posts = () => {
  const [postsArray, setPostArray] = useState(defaultPostArray);
  const { loading, data } = useQuery(ALL_POSTS_QUERY);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPostMutation] = useMutation(EDIT_POST_MUTATION);
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION);
  const [deleteId, setDeleteId] = useState("");
    const {admin, username} = useProfile();
  useEffect(() => {
    let a = null;
    if (!loading) {
      // console.log("data ", data.queryAllPosts)
      setPostArray(data.queryAllPosts);
    }
  }, [loading]);
  // for modal
  const showModal = (e) => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let onFinish = (e) => {
    console.log("e", e);
    editPostMutation({
        variables: {
          id: e.id,
          title: e.title,
          body: e.body,

        },
      });
    setIsModalVisible(false);
  };


  // edit post part
  const EditPost = ({post}) => {
    // console.log(post);
    let keys = ["title", "body", "id"];
    return (
        //! this can be use in profile.js to set initial value
      <Form onFinish={onFinish} initialValues={{

        title:post.title,
        body:post.body
      }}>
        {keys.map((key) => {
            console.log("render ", post)
          return (
            <>               
              {key==="id" ? (
                <Form.Item  name={key} initialValue={post.id}>
              </Form.Item>
              ) : (
                <Form.Item label={key} name={key}>
                  <Input />
                </Form.Item>
              )}
            </>
          );
        })}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            submit update
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const EditPostButton = ({post})=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log("post", post);
    const showModal = (e) => {
      setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
      };
    return (
      <>
        <Button type="text" onClick={showModal}>
          {" "}
          <FormOutlined />
        </Button>
        <Modal
          title="Editing this post"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <EditPost post={post}/>
        </Modal>
      </>
    );
  }

  //delete post part

  let handleDeletePost = (e)=>{
      console.log("handleDeletePost", deleteId)
    deletePostMutation({
        variables: {
          id: e.id,
          username: username

        },
      });
  }
  const DeletePost = ({post})=>{
      console.log("post.id", post.id)
    setDeleteId(post.id)
    return(
        <Button danger block type="primary" htmlType="submit" onClick={handleDeletePost}>
            delete
        </Button>
    )
  }
  const DeletePostButton = ({post})=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log("post", post);
    const showModal = (e) => {
      setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
      };
    return (
      <>
        <Button type="text" onClick={showModal}>
          {" "}
          <DeleteOutlined />
        </Button>
        <Modal
          title="Do you wanna delete this post?"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <DeletePost post={post}/>
        </Modal>
      </>
    );
  }



  return (
    <>
      {postsArray.map((post) => {
        return (
          <Layout>
            <Content>
              <Row wrap={true}>
                <Col span={5}>
                  <Card
                    style={{ width: 240 }}
                    cover={<img src={defaultPortrait} />}
                  >
                    <>
                      {post.author.username || "an author"}
                      {post.author.username===username || admin?
                      <>
                        <EditPostButton post= {post}/>
                        <DeletePostButton post={post}/>
                      </>:
                        <></>
                    }
                    </>
                  </Card>
                </Col>
                <Col span={19}>
                  <Divider orientation="left" orientationMargin="1">
                  {
                      post.type==="hount"?
                      <Tag color="magenta">hount</Tag>:<></>
                      
                    }{
                      post.type==="recruit"?
                      <Tag color="green">recruit</Tag>:<></>
                  }
                  {post.type==="course"?
                      <Tag color="geekblue">course</Tag>:<></>
                  }
                  {post.title}{" "}
                  </Divider>
                  <Meta title="" description={post.body} />
                  
                  <br />
                  {/* <Meta title="date" description={post.date} /> */}
                  <Divider orientation="right" plain>
                    {post.date}
                  </Divider>
                </Col>
              </Row>
            </Content>


          </Layout>
        );
      })}
    </>
  );
};
const removeCertainElement = (array, element) => {
  let index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
export { Posts };
