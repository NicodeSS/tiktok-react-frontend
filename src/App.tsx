import React, {useState} from 'react'
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs'
import LiveTvIcon from '@material-ui/icons/LiveTv';
import CloseIcon from '@material-ui/icons/Close';
import VideoPage from "./VideoPage"
import LivePage from "./LivePage"


import "./App.css"



function App() {
    const [tabIndex,setTabIndex] = useState(0)
    return (
        <div className={"app"}>
            <Tabs
                onSelect={()=>console.log(tabIndex)}
                selectedIndex={tabIndex}
            >
                <TabList style={{"display":"none"}}>
                    <Tab>Video</Tab>
                    <Tab>Live</Tab>
                </TabList>

                <TabPanel>
                    <div className={"app-container"}>
                        <div className={"LiveButton"}>
                            <LiveTvIcon
                                fontSize={"large"}
                                htmlColor={"white"}
                                onClick={()=>{setTabIndex(1)}}
                            ></LiveTvIcon>
                        </div>
                        <VideoPage></VideoPage>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={"app-container"}>
                        <div className={"CloseButton"}>
                            <CloseIcon
                                fontSize={"large"}
                                htmlColor={"white"}
                                onClick={()=>{setTabIndex(0)}}
                            ></CloseIcon>
                        </div>
                        <LivePage></LivePage>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default App