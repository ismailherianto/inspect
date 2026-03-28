const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const projects = [
  {
    id: 1,
    project: "Mazda Kumala - Dealer Platform",
    stack: "CI3, MySQL, jQuery, Bootstrap",
  },
  {
    id: 2,
    project: "Wedding Invitation - Personal Project",
    stack: "HTML, CSS, JavaScript",
  },
  {
    id: 3,
    project: "Sistem Informasi Persuratan STIMI YAPMI - Personal Project",
    stack: "React, Laravel, MySQL, Tailwind CSS, antdesign, typescript",
  },
];

const experience = [
  {
    company: "PT. Kumala Group",
    role: "Full Stack Developer",
    duration: "2021 - 2024",
    description:
      "Maintained applications for Honda, Mazda, Mercedes, and Wuling branch dealers. Developed web applications to streamline user transactions, utilizing Laravel, CodeIgniter, and Express.js technologies.",
  },
  {
    company: "PT. Bosowa Utama",
    role: "Web Developer",
    duration: "2018 - 2021",
    description:
      "Performed maintenance and redesign of Laravel-based web applications to meet user needs. Experienced in migrating desktop applications to web platforms, ensuring a seamless transition with improved performance and user experience.",  
  },
  {
    company: "PT. Pelindo IV Cabang Petikemas Makassar",
    role: "IT Support (Intern)",
    duration: "2016",
    description:
      "As an intern, responsible for daily hardware inspections and assisting the IT department, particularly in maintaining and repairing internet networks.",
  }
];

let fakeToken: string | null = null;

export const getAbout = async () => {
  await delay(500);

  return {
    status: 200,
    time: "80ms",
    data: {
      name: "Muh. Ismail Herianto",
      role: "Full Stack Developer",
      focus: "Web Development",
      email: "ianlotus35@gmail.com",
    },
  };
};

export const getProjects = async (config?: any) => {
  await delay(800);

  const limit = config?.params?.limit;

  const token = config?.headers?.Authorization;

  if (!token || token !== `Bearer ${fakeToken}`) {
    return {
      status: 401,
      time: "60ms",
      message: "Unauthorized",
    };
  }

  let result = projects;

  if (limit) {
    result = projects.slice(0, Number(limit));
  }

  return {
    status: 200,
    time: "120ms",
    total: projects.length,
    data: result,
  };
};

export const getExperience = async (config?: any) => {
  await delay(800);

  const limit = config?.params?.limit;

  const token = config?.headers?.Authorization;

  if (!token || token !== `Bearer ${fakeToken}`) {
    return {
      status: 401,
      time: "60ms",
      message: "Unauthorized",
    };
  }

  let result = experience;

  if (limit) {
    result = experience.slice(0, Number(limit));
  }

  return {
    status: 200,
    time: "121ms",
    total: experience.length,
    data: result,
  };
};

export const getSkills = async () => {
  await delay(600);

  return {
    status: 200,
    time: "90ms",
    data: {
      backend: [
        "Laravel",
        "Node.js",
        "Codeigniter 3/4",
        "Express.js",
        "Fast API",
      ],
      frontend: ["React", "jQuery", "Bootstrap", "Tailwind CSS", "antdesign"],
      database: ["MySQL", "PostgreSQL", "MongoDB"],
    },
  };
};

export const login = async () => {
  await delay(500);

  const username = "admin";
  const password = "admin";

  if (username === "admin" && password === "admin") {
    fakeToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImYwN2UyZGZiYjg5NWUwYTBmNDg5ZjdhZjU3NGQxZGFmIn0.e30.3xb27MLyhmd_j3s1L6NF0s7JV6LT_PcHBxa-rAzPZQgXpKAMrstUFBzG7qjMKD719yy7Aj6vbJgr9h2d7kz9kA";

    return {
      status: 200,
      time: "80ms",
      data: {
        token: fakeToken,
        message: "Login success",
      },
    };
  }

  return {
    status: 401,
    time: "70ms",
    message: "Invalid credentials",
  };
};
