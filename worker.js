export default {

    async fetch(request) {

        if (request.method === "OPTIONS") {

            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "POST, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type"
                }
            });
        }


        if (request.method !== "POST") {

            return new Response(
                "Method not allowed",
                {
                    status: 405,
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
        }


        try {

            const data =
                await request.json();


            console.log(
                "LOCATION RECEIVED:",
                JSON.stringify(data)
            );


            return new Response(
                JSON.stringify({
                    success: true
                }),
                {
                    status: 200,

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Access-Control-Allow-Origin":
                            "*"
                    }
                }
            );


        } catch (error) {

            console.error(
                "ERROR:",
                error
            );


            return new Response(
                JSON.stringify({
                    success: false
                }),
                {
                    status: 400,

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Access-Control-Allow-Origin":
                            "*"
                    }
                }
            );
        }
    }
};
