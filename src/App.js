
import './App.css';
import { Home } from "./Pages/Home/Home.js"
import {Member} from "./Pages/Member/Member.js"
import {Prof} from "./Pages/Prof/Prof.js"
import {Forum} from "./Pages/Forum/Forum.js"
import {Message} from "./Pages/Message/Message.js"
import {Profile} from "./Pages/Profile/Profile"

import {  Layout, Row, Col,Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import MyNavbar from './Components/Navbar/index.js';
import {BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
//TODO 做出forum的update post delete 然後有admin功能
const { Header, Content, Footer } = Layout;

function App() {
  const navItem = ["Home", "Prof", "Forum", "Chat", "Members"]

  return (
    <>

        {/* <div>helo</div> */}
        <BrowserRouter>
        
          <MyNavbar />
          <div style={{"height" : "50px"}}></div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />} />
              <Route path="/prof" element={<Prof />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/message" element={<Message />} />
              <Route path="/members" element={<Member />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/home" />}/>
            
          </Routes>
          {
            // Routes 就是以前的switch
          }

        </BrowserRouter>
        <Layout>
          <Footer>
          <Row>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}><Divider orientation="right">WP110 Mary@2022</Divider></Col>
          </Row>
          </Footer>
        </Layout>
    </>
    




  );
}

export default App;
