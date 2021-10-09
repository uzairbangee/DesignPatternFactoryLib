import {createAPIGremlin, createApiCypher} from "./services";

enum Language {
    Gremlin = "Gremlin",
    Cypher = "Cypher"
}

abstract class PanacloudQueryCreator {

    public abstract api(type: string): ApiQuery;
    public abstract user(type: string): UserQuery;

}

class PanacloudQueryConcreteCreator extends PanacloudQueryCreator {

    public api(type: Language): ApiQuery {
        switch(type){
            case Language.Gremlin:
                return new GremlinApiQuery();
                break;
            case Language.Cypher:
                return new CypherApiQuery();
                break;
            default: 
                throw new Error("No such Query");
        }
    }

    public user(type: Language): UserQuery {
        switch(type){
            case Language.Gremlin:
                return new GremlinUserQuery();
                break;
            case Language.Cypher:
                return new CypherUserQuery();
                break;
            default: 
                throw new Error("No such Query");
        }
    }

}

///API //////
interface ApiQuery {
    createApi(name:string): any;
}

class GremlinApiQuery implements ApiQuery { 

    async createApi(name:string): Promise<any> {
        const result = await createAPIGremlin(name);
        return result;
    }
}

class CypherApiQuery implements ApiQuery { 

    async createApi(name:string): Promise<any> {
        const result = await createApiCypher(name);
        return result;
    }

}


///USER //////
interface UserQuery {
    createUser(name:string): any;
}

class GremlinUserQuery implements UserQuery { 

    async createUser(name:string): Promise<any> {
        const result = await createAPIGremlin(name);
        return result;
    }
}

class CypherUserQuery implements UserQuery { 

    async createUser(name:string): Promise<any> {
        const result = await createApiCypher(name);
        return result;
    }

}

export default PanacloudQueryConcreteCreator;