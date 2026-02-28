exports.createAdmin = async (req, res) => {
  try {
    console.log("Incoming admin data:", req.body); // <--- log it

    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || "Editor",
      status: status || "Active",
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    console.error("Error in createAdmin:", err); // <--- detailed log
    res.status(500).json({ message: "Server Error creating admin", error: err.message });
  }
};