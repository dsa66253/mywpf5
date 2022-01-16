import { useProfile } from "../../Hooks/useProfile.js";
import { useEffect, useState } from "react";
import { MY_USER_QUERY, UPDATE_USER_MUTATION } from "../../graphql/index.js";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {Col, Row, Card, Avatar, Button, Modal, Form, Input, message} from "antd"
import  { Navigate } from 'react-router-dom'
import defaultPortrait from "../../assets/portrait.png";
import {EditOutlined} from '@ant-design/icons';


const {Meta} = Card
const Profile = () => {
  const { signIn, username } = useProfile();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { loading, data, refetch } = useQuery(MY_USER_QUERY, {
    variables: { username: username },
  });
  const [profile, setProfile] = useState({});
  const [editProfile, setEditProfile] = useState({});
  const [form] = Form.useForm();
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  
  
  useEffect(() => {
    if (!loading) {
    //   console.log("MY_USER_QUERY data", data.queryUser);
      setProfile(data.queryUser);
      setEditProfile(data.queryUser);
    }
  }, [loading]);
  


    if (!signIn){
        // console.log("signIn", signIn)
        message.error('You need to login first');
        return <Navigate to='/home'  />
    }

    let ProfileInfo = ()=>{
        let keys = Object.keys(profile);
        keys = removeCertainElement(keys, "__typename");
        return (
            keys.map((key) => {
                return <Meta description={(()=>{
                    if(profile[key]!==null){
                        return key + ": " + profile[key]
                    }
                })()} />;
            })
        )
    }
    let onFinish=async (e)=>{
        // console.log("values", e)
        updateUser({
            variables: {
                username: username,
                email: e.email,
                picture: e.picture,
                friends: e.friends,
                interest: e.interest, 
                field: e.field,
                skill: e.skill,
                position: e.position, 
            },
          });
          let {data} = await refetch()
          setProfile(data.queryUser);
          setEditProfile(data.queryUser);
        setIsModalVisible(false);
    }


    let EditProfile= ()=>{
        let keys = Object.keys(editProfile);
        keys = removeCertainElement(keys, "__typename");
        keys = removeCertainElement(keys, "picture");
        keys = removeCertainElement(keys, "graduate");
        keys = removeCertainElement(keys, "username");
        return(
            <Form onFinish={onFinish}>
            {keys.map((key) => {
                return(
                        <Form.Item label={key} name={key}>
                            <Input defaultValue={editProfile[key]}/>
                        </Form.Item>
                );
            })}
            <Form.Item>
            <Button block type="primary" htmlType="submit">send</Button>
            </Form.Item>
            </Form>

        )
    }

    // for modal
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleOk = () => {
      setIsModalVisible(false);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
  return (
    <>
      <Row justify="center">
      <Card 
      style={{ width: 300, marginTop: 16 }} 
      loading={loading}
      cover={<img alt="example" src={defaultPortrait}/>}
      >
          <Meta
            title={<>{username}<Button type="text" onClick={showModal}> <EditOutlined /></Button></>}
          />
          {profile==={}?
          <>empty</>:
        <ProfileInfo/>
          }
        </Card>

      </Row>
      <Modal title="Editing your personal info" visible={isModalVisible} footer={null} onCancel={handleCancel}>

        {profile==={}?
          <>empty</>:
        <EditProfile/>
          }

      </Modal>
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

export { Profile };
