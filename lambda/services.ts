import axios from "axios";

import { driver, process as gprocess, structure } from "gremlin";
const Graph = structure.Graph

declare var process: {
    env: {
      NEPTUNE_ENDPOINT: string;
    };
};

let conn: driver.DriverRemoteConnection;
let g: gprocess.GraphTraversalSource;

const getConnectionDetails = () => {
    const database_url = "wss://" + process.env.NEPTUNE_ENDPOINT + ":8182/gremlin";
    return { url: database_url, headers: {} };
};

const createRemoteConnection = () => {
    const { url, headers } = getConnectionDetails();

    console.log("creating remote connection");

    return new driver.DriverRemoteConnection(url, {
            mimeType: "application/vnd.gremlin-v2.0+json",
            pingEnabled: false,
            headers: headers,
        });
};

const __ = gprocess.statics
const id = gprocess.t.id
const single = gprocess.cardinality.single;

conn = createRemoteConnection()
const graph = new Graph()
g = graph.traversal().withRemote(conn);

export const createAPIGremlin = async (name: string) => {
    try{
        console.log("g ", g);
        const user = await g.addV('user')
                        .property(id, name)
                        .property('name', name)
                        .project("name")
                        .by("name")
                        .next();
        console.log("user ", user);
        return user.value;
    }
    catch(err){
        console.log(err);
        return JSON.stringify(err);
    }
}

export const createApiCypher = async (name: string) => {
    try{
        await axios.post('HTTPS://' + process.env.NEPTUNE_ENDPOINT + ':8182/openCypher', `query=CREATE (n:user { id: '${name}' })`);
        const fetch: any = await axios.post('HTTPS://' + process.env.NEPTUNE_ENDPOINT + ':8182/openCypher', `query=MATCH (n:user { id: '${name}' }) RETURN n`)

        console.log("fetch ", fetch.data);
        return fetch.data.results;
    }
    catch(err){
        console.log(err);
        return JSON.stringify(err);
    }
}