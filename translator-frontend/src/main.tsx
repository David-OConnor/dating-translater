// import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface Item {
    id: number
    text: string
    translation: string
    gender: number // pk
    category: number // pk
}


const ItemDisplay = ({item}: {item: Item}) => (
    <div>
        <h3>{ item.text }</h3>
        <h3>What it means:</h3>
        <h3>{ item.translation }</h3>
    </div>
)


class Main extends React.Component<any, any> {
    constructor(props) {
        super(props)

        let headers = new Headers()
        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        this.state = {
            username: 'admin',
            password: 'test',
            items: []}
        // this.addInput = this.addInput.bind(this)
    
        

        fetch('http://127.0.0.1:8000/items/', {
            method: 'GET', 
            headers: {
                'Authorization': 'Basic '+btoa('admin:test'),
                // 'Content-Type': 'application/x-www-form-urlencoded'
                // 'Access-Control-Allow-Origin': '127.0.0.1'
            }
        })
        // We deal with two promises: One to wait for the response from the server,
        // The other to wait for the JSON parsing. Then we unnest from results.
        .then(result => result.json())
        .then(data => this.setState({items: data.results}))

    
    }

    render() {
        const items: Item[] = this.state.items
        console.log(this.state.items, "I")

        return (
            <div>
                <h1>What does he/she really mean?</h1>
                { items.map(i => <ItemDisplay key={i.id} item={i} />) }
            </div>
        )
    }
}


ReactDOM.render(<Main items={[]}/>, document.getElementById('react'))