// // ESM
// import Fastify from 'fastify';
// import routes from './src/routes/index.js';

// /**
//  * @type {import('fastify').FastifyInstance} Instance of Fastify
//  */
// const fastify = Fastify({
//   logger: true
// });

// fastify.register(routes);

// fastify.listen({ port: process.env.PORT }, function (err, address) {
//   console.log("--test--");
//   if (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
//   // Server is now listening on ${address}
// })




// ESM
import Fastify from 'fastify';
import routes from './src/routes/index.js';
import { addLead, getAllLeads} from './src/db/index.js';  // Ensure that .js extension is included
import cors from '@fastify/cors';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
});
// Register CORS before any routes
await fastify.register(cors, { 
  origin:true
})

// handle POST requests for adding leads
fastify.post('/add-lead', async (request, reply) => {
  console.log("--add-lead--");
  const { to, cc, bcc, subject, body } = request.body;

  try {
    await addLead({ to, cc, bcc, subject, body });
    reply.send({ success: true, message: 'Lead added successfully' });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ success: false, message: 'Failed to add lead' });
  }
});

// handle GET requests for retrieving all leads
fastify.get('/leads', async (request, reply) => {
  try {
    const leads = await getAllLeads();
    reply.send({ success: true, leads });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ success: false, message: 'Failed to retrieve leads' });
  }
});

// Register routes
fastify.register(routes);

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT || 3001;  // Default to 3000 if PORT is not set
    const address = await fastify.listen({ port, host: 'localhost' });
    console.log(`Server is running at ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

