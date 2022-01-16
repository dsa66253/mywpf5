import React, { useEffect, useState } from "react";
import defaultPortrait from "../../assets/portrait.png";
import { Card, Col, Row } from "antd";
import { memberData } from "./memberData.js";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {ALL_MEMBERS_QUERY} from "../../graphql/index.js"

// TODO 剩下把card排版

// TODO depoly試試看


const { Meta } = Card;

const Member = () => {
  const [memberArray, setMemberArray] = useState(memberData);
  const {loading, data} = useQuery(ALL_MEMBERS_QUERY);

  useEffect(()=>{
    if(!loading){
        console.log("data.queryAllMembers ", data.queryAllMembers);
        setMemberArray(data.queryAllMembers)
        
    }
  }, [loading])

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16} justify="center" type="flex" align="middle">
          {/* create a card for each member */}
          {memberArray.map((member) => {
            // console.log("member", member);
            let keys = Object.keys(member);
            keys = removeCertainElement(keys, "username");
            keys = removeCertainElement(keys, "graduate");
            keys = removeCertainElement(keys, "__typename");
            // console.log("keys ", keys);
            return (
              <>
                <Col span={8} align="top">
                  {/* use this way to let img fit into card */}
                  <Card
                    title={
                      <img
                        src={defaultPortrait}
                        width="100%"
                        height="100%"
                      ></img>
                    }
                    bordered={true}
                    style={{
                      width: 300,
                      marginTop: 16,
                      verticalAlign: "middle",
                    }}
                  >
                    {/* handle personal info */}
                    <Meta title={member.username} />
                    {/* directly call an arrow function to filter undefined personal info */}
                    {keys.map((key) => {
                      return <Meta description={(()=>{
                          if(member[key]!==null){
                              return key + ": " + member[key]
                          }
                      })()} />;
                    })}
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </div>
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

export { Member };
