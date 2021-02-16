import React, {useEffect, useState} from "react"
import getLives from "./api/live";
import Live from "./Live";

import "./LivePage.css"

class LivePage extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {lives:[]};
    }
    componentDidMount() {
        let response = getLives();
        response.then(((data: any) => {
            let lives = data.map((live) => ({
                id: live.id,
                data: live.data
            }))
            this.setState({lives:lives})
        }))
    }
    render(){
        return (
            <div className="app_lives">
                {
                    this.state.lives.map(({id, data}) => (
                        <Live
                            key={id}
                            url={data.url}
                            author={data.author}
                            description={data.description}
                            createdAt={data.createdAt}
                            updatedAt={data.updatedAt}
                            like={data.like}
                            comment={data.comment}
                            share={data.share}
                        />
                    ))
                }
            </div>
        );
    }
}



// function LivePage():JSX.Element {
//     const [lives, setLives] = useState<any[]>([]);
//
//     useEffect(() => {
//         let response = getLives();
//
//         response.then(((data: any) => {
//             setLives(data.map((live) => ({
//                 id: live.id,
//                 data: live.data
//             })))
//         }))
//     }, [lives]);
//
//     return (
//         <div className="app_lives">
//             {
//                 lives.map(({id, data}) => (
//                     <Live
//                         key={id}
//                         url={data.url}
//                         author={data.author}
//                         description={data.description}
//                         createdAt={data.createdAt}
//                         updatedAt={data.updateddAt}
//                         like={data.like}
//                         comment={data.comment}
//                         share={data.share}
//                     />
//                 ))
//             }
//         </div>
//     );
// }

export default LivePage