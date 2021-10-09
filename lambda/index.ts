import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import PanacloudQueryConcreteCreator from "./PanacloudQueries";

enum Language {
    Gremlin = "Gremlin",
    Cypher = "Cypher"
}
export async function handler(event: APIGatewayProxyEvent, context: Context) {

    try {

        console.log("event", event);

        const qClient = new PanacloudQueryConcreteCreator();
        // const gremlin_result = await qClient.api(Language.Gremlin).createApi("Sami")
        // console.log("result ", gremlin_result)

        const cypher_result = await qClient.user(Language.Cypher).createUser("uzair");
        console.log("new_result ", cypher_result)

        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify("adcas"),
        };

    }
    catch (e) {
        console.log('error', e)

        return {
            statusCode: 500,
            headers: { "Content-Type": "text/plain" },
            body: "error occured",
          };
    }



}