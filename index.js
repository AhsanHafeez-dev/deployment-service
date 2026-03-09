// import { Vercel } from "@vercel/sdk";
// import bodyParser from "body-parser";
// import express from "express";
// import dotenv from "dotenv"
// dotenv.config()
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// const app = express();
// app.use(express.json());
// app.use(bodyParser.json())
// const vercel = new Vercel({
//   bearerToken: process.env.V_TOKEN,
// });

// async function setupEnvVar(projectId) {
//   const env = await vercel.projects.createProjectEnv({
//     idOrName: projectId,
//     requestBody: {
//       key: "MY_API_URL",
//       value: "https://api.vercel.com",
//       target: ["production", "preview", "development"],
//       type: "plain",
//     },
//   });

// }

// async function createProject(projectName, githubUserName, repositoryName) {
//   try {
//     const project = await vercel.projects.createProject({
//       requestBody: {
//         name: projectName,
//         framework: "nextjs",
//         gitRepository: {
//           type: "github",
//           repo: repositoryName,
//           org: githubUserName,
//         },
//         buildCommand: "npm run build",
//         devCommand: "npm run dev",
//         outputDirectory: ".next",
//       },
//     });
//     console.log("✅ Project created:", project.id);
//     return project;
//   } catch (err) {
//     console.error("❌ Failed to create project:", err);
//     throw err;
//   }
// }

// async function deploy(userName, projectId, githubUserName, repositoryName) {
//   const projectName = userName + "-" + projectId;
//   const project = await createProject(
//     projectName,
//     githubUserName,
//     repositoryName,
//   );

//   await setupEnvVar(project?.id);

//   try {
//     const deployment = await vercel.deployments.createDeployment({
//       requestBody: {
//         name: projectName,
//         project: project.id,
//         gitSource: {
//           type: "github",
//           repo: repositoryName,
//           ref: "main",
//           org: githubUserName,
//         },
//         target: "production",
//       },
//     });

//     const deploymentUrl = `https://${deployment?.oidcTokenClaims?.project}.vercel.app`;
//     console.log(`Deployment URL: ${deploymentUrl}`);
//     console.log(
//       `Deployment ID: ${deployment.id}, status: ${deployment.status}`,
//     );

//     return deploymentUrl;
//   } catch (err) {
//     console.error("❌ Deployment failed:", err);
//     throw err;
//   }
// }

// // API endpoint
// app.post("/api/deploy", async (req, res) => {
//     try {

//       let { repositoryName, githubUserName, userName } = req.body;
//         if (!githubUserName && !userName ){
//     githubUserName = "AhsanHafeez-dev";
//     userName = "ahsan";
// }

//     // Validate input
//     if (!repositoryName || !githubUserName || !userName) {
//       return res.status(400).json({
//         error: "Missing required parameters",
//         required: ["repositoryName", "githubUserName", "userName"],
//       });
//     }

//     const projectId = Date.now();
//     const deploymentUrl = await deploy(
//       userName,
//       projectId,
//       githubUserName,
//       repositoryName,
//     );
//       await sleep(90000);

//     res.json({
//       success: true,
//       deploymentUrl,
//       projectId,
//       message: "Deployment initiated successfully",
//     });
//   } catch (error) {
//     console.error("Deployment error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Deployment failed",
//     });
//   }
// });

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", timestamp: new Date().toISOString() });
// });

// // Root endpoint
// app.get("/", (req, res) => {
//   res.json({
//     message: "Vercel Deployment API",
//     endpoints: {
//       deploy: "POST /api/deploy",
//       health: "GET /api/health",
//     },
//   });
// });

// // const PORT = process.env.PORT || 3000;

// // For Vercel serverless, export the app
// export default app;

// // For local development
// // if (process.env.NODE_ENV !== "production") {
// //   app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// //   });
// // }

// import { Vercel } from "@vercel/sdk";
// import bodyParser from "body-parser";
// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const app = express();
// app.use(express.json());
// app.use(bodyParser.json());

// const vercel = new Vercel({
//   bearerToken: process.env.V_TOKEN,
// });

// // Hardcoded environment variables
// const ENV_VARIABLES = [
//   {
//     key: "DATABASE_URL",
//     value:
//       process.env.DATABASE_URL ||
//       "postgresql://user:password@localhost:5432/mydb",
//     type: "encrypted",
//   },
//   {
//     key: "GITHUB_ID",
//     value: process.env.GITHUB_ID || "your_github_id",
//     type: "plain",
//   },
//   {
//     key: "GITHUB_SECRET",
//     value: process.env.GITHUB_SECRET || "your_github_secret",
//     type: "encrypted",
//   },
//   {
//     key: "GOOGLE_CLIENT_ID",
//     value: process.env.GOOGLE_CLIENT_ID || "your_google_client_id",
//     type: "plain",
//   },
//   {
//     key: "GOOGLE_CLIENT_SECRET",
//     value: process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret",
//     type: "encrypted",
//   },
//   {
//     key: "NEXTAUTH_SECRET",
//     value: process.env.NEXTAUTH_SECRET || "your_nextauth_secret",
//     type: "encrypted",
//   },
//   {
//     key: "NEXTAUTH_URL",
//     value: process.env.NEXTAUTH_URL || "https://yourdomain.com",
//     type: "plain",
//   },
//   {
//     key: "STRIPE_SECRET_KEY",
//     value: process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret",
//     type: "encrypted",
//   },
//   {
//     key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
//     value:
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
//       "pk_test_your_stripe_public",
//     type: "plain",
//   },
//   {
//     key: "MY_API_URL",
//     value: "https://api.vercel.com",
//     type: "plain",
//   },
// ];

// async function setupEnvVars(projectId) {
//   console.log("🔧 Setting up environment variables...");

//   try {
//     for (const envVar of ENV_VARIABLES) {
//       await vercel.projects.createProjectEnv({
//         idOrName: projectId,
//         requestBody: {
//           key: envVar.key,
//           value: envVar.value,
//           target: ["production", "preview", "development"],
//           type: envVar.type, // Use "encrypted" for sensitive values, "plain" for public
//         },
//       });
//       console.log(`✅ Added: ${envVar.key}`);
//     }
//     console.log("✅ All environment variables set successfully");
//   } catch (err) {
//     console.error("❌ Failed to set environment variables:", err);
//     throw err;
//   }
// }

// async function createProject(projectName, githubUserName, repositoryName) {
//   try {
//     const project = await vercel.projects.createProject({
//       requestBody: {
//         name: projectName,
//         framework: "nextjs",
//         gitRepository: {
//           type: "github",
//           repo: repositoryName,
//           org: githubUserName,
//         },
//         buildCommand: "npm run build",
//         devCommand: "npm run dev",
//         outputDirectory: ".next",
//       },
//     });
//     console.log("✅ Project created:", project.id);
//     return project;
//   } catch (err) {
//     console.error("❌ Failed to create project:", err);
//     throw err;
//   }
// }

// async function deploy(userName, projectId, githubUserName, repositoryName) {
//   const projectName = userName + "-" + projectId;
//   const project = await createProject(
//     projectName,
//     githubUserName,
//     repositoryName,
//   );

//   // Set up all environment variables before deployment
//   await setupEnvVars(project?.id);

//   try {
//     const deployment = await vercel.deployments.createDeployment({
//       requestBody: {
//         name: projectName,
//         project: project.id,
//         gitSource: {
//           type: "github",
//           repo: repositoryName,
//           ref: "main",
//           org: githubUserName,
//         },
//         target: "production",
//       },
//     });

//     const deploymentUrl = `https://${deployment?.oidcTokenClaims?.project}.vercel.app`;
//     console.log(`Deployment URL: ${deploymentUrl}`);
//     console.log(
//       `Deployment ID: ${deployment.id}, status: ${deployment.status}`,
//     );

//     return deploymentUrl;
//   } catch (err) {
//     console.error("❌ Deployment failed:", err);
//     throw err;
//   }
// }

// // API endpoint
// app.post("/api/deploy", async (req, res) => {
//   try {
//     let { repositoryName, githubUserName, userName } = req.body;
//     if (!githubUserName && !userName) {
//       githubUserName = "AhsanHafeez-dev";
//       userName = "ahsan";
//     }

//     // Validate input
//     if (!repositoryName || !githubUserName || !userName) {
//       return res.status(400).json({
//         error: "Missing required parameters",
//         required: ["repositoryName", "githubUserName", "userName"],
//       });
//     }

//     const projectId = Date.now();
//     const deploymentUrl = await deploy(
//       userName,
//       projectId,
//       githubUserName,
//       repositoryName,
//     );
//     await sleep(90000);

//     res.json({
//       success: true,
//       deploymentUrl,
//       projectId,
//       message: "Deployment initiated successfully",
//     });
//   } catch (error) {
//     console.error("Deployment error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Deployment failed",
//     });
//   }
// });

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", timestamp: new Date().toISOString() });
// });

// // Root endpoint
// app.get("/", (req, res) => {
//   res.json({
//     message: "Vercel Deployment API",
//     endpoints: {
//       deploy: "POST /api/deploy",
//       health: "GET /api/health",
//     },
//   });
// });

// export default app;

// import { Vercel } from "@vercel/sdk";
// import bodyParser from "body-parser";
// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const app = express();
// app.use(express.json());
// app.use(bodyParser.json());

// const vercel = new Vercel({
//   bearerToken: process.env.V_TOKEN,
// });

// // Hardcoded environment variables
// const ENV_VARIABLES = [
//   {
//     key: "DATABASE_URL",
//     value:
//       process.env.DATABASE_URL ||
//       "postgresql://user:password@localhost:5432/mydb",
//     type: "encrypted",
//   },
//   {
//     key: "NEXTAUTH_SECRET",
//     value: process.env.NEXTAUTH_SECRET || "your_nextauth_secret",
//     type: "encrypted",
//   },
//   {
//     key: "NEXTAUTH_URL",
//     value: process.env.NEXTAUTH_URL || "https://yourdomain.com",
//     type: "plain",
//   },
//   {
//     key: "STRIPE_SECRET_KEY",
//     value: process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret",
//     type: "encrypted",
//   },
//   {
//     key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
//     value:
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
//       "pk_test_your_stripe_public",
//     type: "plain",
//   },
//   {
//     key: "MY_API_URL",
//     value: "https://api.vercel.com",
//     type: "plain",
//   },
//   {
//     key: "EMAIL_FROM",
//     value: process.env.EMAIL_FROM,
//     type: "plain",
//   },

//   {
//     key: "EMAIL_SERVER_USER",
//     value: process.env.EMAIL_SERVER_USER,
//     type: "plain",
//   },

//   {
//     key: "EMAIL_SERVER_PASSWORD",
//     value: process.env.EMAIL_SERVER_PASSWORD,
//     type: "plain",
//   },

//   {
//     key: "CLOUDINARY_CLOUD_NAME",
//     value: process.env.CLOUDINARY_CLOUD_NAME,
//     type: "plain",
//   },

//   {
//     key: "CLOUDINARY_API_KEY",
//     value: process.env.CLOUDINARY_API_KEY,
//     type: "plain",
//   },

//   {
//     key: "CLOUDINARY_API_SECRET",
//     value: process.env.CLOUDINARY_API_SECRET,
//     type: "plain",
//   },

//   {
//     key: "EMAIL_SERVER_HOST",
//     value: process.env.EMAIL_SERVER_HOST,
//     type: "plain",
//   },

//   {
//     key: "EMAIL_SERVER_PORT",
//     value: process.env.EMAIL_SERVER_PORT,
//     type: "plain",
//   },
// ];

// async function setupEnvVars(projectId) {
//   console.log("🔧 Setting up environment variables...");

//   try {
//     for (const envVar of ENV_VARIABLES) {
//       await vercel.projects.createProjectEnv({
//         idOrName: projectId,
//         requestBody: {
//           key: envVar.key,
//           value: envVar.value,
//           target: ["production", "preview", "development"],
//           type: envVar.type, // Use "encrypted" for sensitive values, "plain" for public
//         },
//       });
//       console.log(`✅ Added: ${envVar.key}`);
//     }
//     console.log("✅ All environment variables set successfully");
//   } catch (err) {
//     console.error("❌ Failed to set environment variables:", err);
//     throw err;
//   }
// }

// async function updateNextAuthUrl(projectId, deploymentUrl) {
//   console.log("🔄 Updating NEXTAUTH_URL with deployment URL...");

//   try {
//     // First, get all environment variables to find the NEXTAUTH_URL env ID
//     const envVars = await vercel.projects.filterProjectEnvs({
//       idOrName: projectId,
//     });

//     // Find the NEXTAUTH_URL environment variable
//     const nextAuthEnv = envVars.envs?.find((env) => env.key === "NEXTAUTH_URL");

//     if (nextAuthEnv) {
//       // Update the existing NEXTAUTH_URL
//       await vercel.projects.editProjectEnv({
//         idOrName: projectId,
//         id: nextAuthEnv.id,
//         requestBody: {
//           value: deploymentUrl,
//           target: ["production", "preview", "development"],
//           type: "plain",
//         },
//       });
//       console.log(`✅ Updated NEXTAUTH_URL to: ${deploymentUrl}`);
//     } else {
//       console.warn(
//         "⚠️ NEXTAUTH_URL not found in project environment variables",
//       );
//     }
//   } catch (err) {
//     console.error("❌ Failed to update NEXTAUTH_URL:", err);
//     throw err;
//   }
// }

// async function createProject(projectName, githubUserName, repositoryName) {
//   try {
//     const project = await vercel.projects.createProject({
//       requestBody: {
//         name: projectName,
//         framework: "nextjs",
//         gitRepository: {
//           type: "github",
//           repo: repositoryName,
//           org: githubUserName,
//         },
//         buildCommand: "npm run build",
//         devCommand: "npm run dev",
//         outputDirectory: ".next",
//       },
//     });
//     console.log("✅ Project created:", project.id);
//     return project;
//   } catch (err) {
//     console.error("❌ Failed to create project:", err);
//     throw err;
//   }
// }

// async function deploy(userName, projectId, githubUserName, repositoryName) {
//   const projectName = userName + "-" + projectId;
//   const project = await createProject(
//     projectName,
//     githubUserName,
//     repositoryName,
//   );

//   // Set up all environment variables before deployment
//   await setupEnvVars(project?.id);

//   try {
//     const deployment = await vercel.deployments.createDeployment({
//       requestBody: {
//         name: projectName,
//         project: project.id,
//         gitSource: {
//           type: "github",
//           repo: repositoryName,
//           ref: "main",
//           org: githubUserName,
//         },
//         target: "production",
//       },
//     });

//     const deploymentUrl = `https://${deployment?.oidcTokenClaims?.project}.vercel.app`;
//     console.log(`Deployment URL: ${deploymentUrl}`);
//     console.log(
//       `Deployment ID: ${deployment.id}, status: ${deployment.status}`,
//     );

//     // Update NEXTAUTH_URL with the actual deployment URL
//     await updateNextAuthUrl(project.id, deploymentUrl);

//     return { deploymentUrl, projectVercelId: project.id };
//   } catch (err) {
//     console.error("❌ Deployment failed:", err);
//     throw err;
//   }
// }

// // API endpoint
// app.post("/api/deploy", async (req, res) => {
//   try {
//     let { repositoryName, githubUserName, userName,database_url } = req.body;
//     if (!githubUserName && !userName) {
//       githubUserName = "AhsanHafeez-dev";
//       userName = "ahsan";
//     }
//     if (database_url) {
//       ENV_VARIABLES[0].value=database_url
//     }
//     // Validate input
//     if (!repositoryName || !githubUserName || !userName) {
//       return res.status(400).json({
//         error: "Missing required parameters",
//         required: ["repositoryName", "githubUserName", "userName"],
//       });
//     }

//     const projectId = Date.now();
//     const { deploymentUrl, projectVercelId } = await deploy(
//       userName,
//       projectId,
//       githubUserName,
//       repositoryName,
//     );
//     await sleep(90000);

//     res.json({
//       success: true,
//       deploymentUrl,
//       projectId,
//       projectVercelId,
//       message: "Deployment initiated successfully",
//     });
//   } catch (error) {
//     console.error("Deployment error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Deployment failed",
//     });
//   }
// });

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", timestamp: new Date().toISOString() });
// });

// // Root endpoint
// app.get("/", (req, res) => {
//   res.json({
//     message: "Vercel Deployment API",
//     endpoints: {
//       deploy: "POST /api/deploy",
//       health: "GET /api/health",
//     },
//   });
// });

// export default app;





import { Vercel } from "@vercel/sdk";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const vercel = new Vercel({
  bearerToken: process.env.V_TOKEN,
});

// Hardcoded environment variables
const ENV_VARIABLES = [
  {
    key: "DATABASE_URL",
    value:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/mydb",
    type: "encrypted",
  },
  {
    key: "NEXTAUTH_SECRET",
    value: process.env.NEXTAUTH_SECRET || "your_nextauth_secret",
    type: "encrypted",
  },
  {
    key: "NEXTAUTH_URL",
    value: process.env.NEXTAUTH_URL || "https://yourdomain.com",
    type: "plain",
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret",
    type: "encrypted",
  },
  {
    key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    value:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "pk_test_your_stripe_public",
    type: "plain",
  },
  {
    key: "MY_API_URL",
    value: "https://api.vercel.com",
    type: "plain",
  },
  {
    key: "EMAIL_FROM",
    value: process.env.EMAIL_FROM,
    type: "plain",
  },
  {
    key: "EMAIL_SERVER_USER",
    value: process.env.EMAIL_SERVER_USER,
    type: "plain",
  },
  {
    key: "EMAIL_SERVER_PASSWORD",
    value: process.env.EMAIL_SERVER_PASSWORD,
    type: "plain",
  },
  {
    key: "CLOUDINARY_CLOUD_NAME",
    value: process.env.CLOUDINARY_CLOUD_NAME,
    type: "plain",
  },
  {
    key: "CLOUDINARY_API_KEY",
    value: process.env.CLOUDINARY_API_KEY,
    type: "plain",
  },
  {
    key: "CLOUDINARY_API_SECRET",
    value: process.env.CLOUDINARY_API_SECRET,
    type: "plain",
  },
  {
    key: "EMAIL_SERVER_HOST",
    value: process.env.EMAIL_SERVER_HOST,
    type: "plain",
  },
  {
    key: "EMAIL_SERVER_PORT",
    value: process.env.EMAIL_SERVER_PORT,
    type: "plain",
  },
];

async function setupEnvVars(projectId) {
  console.log("🔧 Setting up environment variables...");

  try {
    for (const envVar of ENV_VARIABLES) {
      await vercel.projects.createProjectEnv({
        idOrName: projectId,
        requestBody: {
          key: envVar.key,
          value: envVar.value,
          target: ["production", "preview", "development"],
          type: envVar.type,
        },
      });
      console.log(`✅ Added: ${envVar.key}`);
    }
    console.log("✅ All environment variables set successfully");
  } catch (err) {
    console.error("❌ Failed to set environment variables:", err);
    throw err;
  }
}

async function updateNextAuthUrl(projectId, deploymentUrl) {
  console.log("🔄 Updating NEXTAUTH_URL with deployment URL...");

  try {
    const envVars = await vercel.projects.filterProjectEnvs({
      idOrName: projectId,
    });

    const nextAuthEnv = envVars.envs?.find((env) => env.key === "NEXTAUTH_URL");

    if (nextAuthEnv) {
      await vercel.projects.editProjectEnv({
        idOrName: projectId,
        id: nextAuthEnv.id,
        requestBody: {
          value: deploymentUrl,
          target: ["production", "preview", "development"],
          type: "plain",
        },
      });
      console.log(`✅ Updated NEXTAUTH_URL to: ${deploymentUrl}`);
    } else {
      console.warn("⚠️ NEXTAUTH_URL not found in project environment variables");
    }
  } catch (err) {
    console.error("❌ Failed to update NEXTAUTH_URL:", err);
    throw err;
  }
}

async function createProject(projectName, githubUserName, repositoryName) {
  try {
    const project = await vercel.projects.createProject({
      requestBody: {
        name: projectName,
        framework: "nextjs",
        gitRepository: {
          type: "github",
          repo: repositoryName,
          org: githubUserName,
        },
        buildCommand: "npm run build",
        devCommand: "npm run dev",
        outputDirectory: ".next",
      },
    });
    console.log("✅ Project created:", project.id);
    return project;
  } catch (err) {
    console.error("❌ Failed to create project:", err);
    throw err;
  }
}

/**
 * Polls Vercel until the deployment reaches a terminal state.
 * Terminal states: READY, ERROR, CANCELED
 *
 * @param {string} deploymentId  - The Vercel deployment ID
 * @param {object} options
 * @param {number} options.intervalMs  - How often to poll (default 5 s)
 * @param {number} options.timeoutMs   - Give up after this long (default 10 min)
 * @returns {{ status: string, deployment: object, errorMessage?: string }}
 */
async function pollDeploymentStatus(
  deploymentId,
  { intervalMs = 5000, timeoutMs = 600000 } = {}
) {
  const deadline = Date.now() + timeoutMs;
  const TERMINAL_STATES = new Set(["READY", "ERROR", "CANCELED"]);

  console.log(`⏳ Polling deployment ${deploymentId} every ${intervalMs / 1000}s…`);

  while (Date.now() < deadline) {
    const deployment = await vercel.deployments.getDeployment({
      idOrUrl: deploymentId,
    });

    const status = deployment.status?.toUpperCase();
    console.log(`   ↳ Status: ${status}`);

    if (TERMINAL_STATES.has(status)) {
      if (status === "READY") {
        return { status, deployment };
      }

      // Build a useful error message from Vercel's build output
      let errorMessage = `Deployment ended with status: ${status}.`;

      if (deployment.errorMessage) {
        errorMessage += ` Vercel error: ${deployment.errorMessage}`;
      }

      // Attempt to pull the last few build-log lines for context
      try {
        const events = await vercel.deployments.getDeploymentEvents({
          idOrUrl: deploymentId,
          limit: 30,
          direction: "backward",
        });

        const errorLines = (events ?? [])
          .filter(
            (e) =>
              e.type === "stderr" ||
              (typeof e.text === "string" &&
                /error|failed|cannot|not found/i.test(e.text))
          )
          .map((e) => e.text)
          .filter(Boolean)
          .slice(-10); // last 10 relevant lines

        if (errorLines.length) {
          errorMessage += `\n\nBuild errors:\n${errorLines.join("\n")}`;
        }
      } catch (_) {
        // Event fetching is best-effort; ignore failures
      }

      return { status, deployment, errorMessage };
    }

    await sleep(intervalMs);
  }

  return {
    status: "TIMEOUT",
    deployment: null,
    errorMessage: `Deployment did not finish within ${timeoutMs / 1000}s.`,
  };
}

async function deploy(userName, projectId, githubUserName, repositoryName) {
  const projectName = userName + "-" + projectId;
  const project = await createProject(projectName, githubUserName, repositoryName);

  await setupEnvVars(project?.id);

  const deployment = await vercel.deployments.createDeployment({
    requestBody: {
      name: projectName,
      project: project.id,
      gitSource: {
        type: "github",
        repo: repositoryName,
        ref: "main",
        org: githubUserName,
      },
      target: "production",
    },
  });

  const deploymentUrl = `https://${deployment?.oidcTokenClaims?.project}.vercel.app`;
  console.log(`🚀 Deployment triggered — URL will be: ${deploymentUrl}`);
  console.log(`   Deployment ID: ${deployment.id}, initial status: ${deployment.status}`);

  // Wait for the deployment to reach a terminal state
  const { status, errorMessage } = await pollDeploymentStatus(deployment.id);

  if (status !== "READY") {
    throw Object.assign(
      new Error(errorMessage || `Deployment failed with status: ${status}`),
      { deploymentStatus: status, deploymentId: deployment.id }
    );
  }

  // Only update NEXTAUTH_URL once we know the deployment succeeded
  await updateNextAuthUrl(project.id, deploymentUrl);

  return { deploymentUrl, projectVercelId: project.id };
}

// ---------------------------------------------------------------------------
// API endpoint
// ---------------------------------------------------------------------------
app.post("/api/deploy", async (req, res) => {
  try {
    let { repositoryName, githubUserName, userName, database_url } = req.body;

    if (!githubUserName && !userName) {
      githubUserName = "AhsanHafeez-dev";
      userName = "ahsan";
    }

    if (database_url) {
      ENV_VARIABLES[0].value = database_url;
    }

    if (!repositoryName || !githubUserName || !userName) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["repositoryName", "githubUserName", "userName"],
      });
    }

    const projectId = Date.now();
    const { deploymentUrl, projectVercelId } = await deploy(
      userName,
      projectId,
      githubUserName,
      repositoryName
    );

    return res.json({
      success: true,
      deploymentUrl,
      projectId,
      projectVercelId,
      message: "Deployment completed successfully",
    });
  } catch (error) {
    console.error("Deployment error:", error);

    return res.status(500).json({
      success: false,
      deploymentStatus: error.deploymentStatus || "ERROR",
      deploymentId: error.deploymentId,
      error: error.message || "Deployment failed",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Vercel Deployment API",
    endpoints: {
      deploy: "POST /api/deploy",
      health: "GET /api/health",
    },
  });
});

export default app;