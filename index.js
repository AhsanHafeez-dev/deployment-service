import { Vercel } from "@vercel/sdk";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv"
dotenv.config()
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const app = express();
app.use(express.json());
app.use(bodyParser.json())
const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});

async function setupEnvVar(projectId) {
  const env = await vercel.projects.createProjectEnv({
    idOrName: projectId,
    requestBody: {
      key: "MY_API_URL",
      value: "https://api.vercel.com",
      target: ["production", "preview", "development"],
      type: "plain",
    },
  });
  
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

async function deploy(userName, projectId, githubUserName, repositoryName) {
  const projectName = userName + "-" + projectId;
  const project = await createProject(
    projectName,
    githubUserName,
    repositoryName,
  );

  await setupEnvVar(project?.id);

  try {
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
    console.log(`Deployment URL: ${deploymentUrl}`);
    console.log(
      `Deployment ID: ${deployment.id}, status: ${deployment.status}`,
    );

    return deploymentUrl;
  } catch (err) {
    console.error("❌ Deployment failed:", err);
    throw err;
  }
}

// API endpoint
app.post("/api/deploy", async (req, res) => {
    try {
        
        
      
      
      let { repositoryName, githubUserName, userName } = req.body;
        if (!githubUserName && !userName ){
    githubUserName = "AhsanHafeez-dev";
    userName = "ahsan";
}

    // Validate input
    if (!repositoryName || !githubUserName || !userName) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["repositoryName", "githubUserName", "userName"],
      });
    }

    const projectId = Date.now();
    const deploymentUrl = await deploy(
      userName,
      projectId,
      githubUserName,
      repositoryName,
    );
      await sleep(90000);
    
    res.json({
      success: true,
      deploymentUrl,
      projectId,
      message: "Deployment initiated successfully",
    });
  } catch (error) {
    console.error("Deployment error:", error);
    res.status(500).json({
      success: false,
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

// const PORT = process.env.PORT || 3000;

// For Vercel serverless, export the app
export default app;

// For local development
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }
