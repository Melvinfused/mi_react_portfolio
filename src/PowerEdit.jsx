import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEditMode } from "./EditContext";
import "./PowerEdit.css";
import portfolioData from "./data/portfolio.json";

// Default data structures
const defaultBioData = {
    intro1: "I'm Melvin Francy, a self-motivated final-year Integrated MCA student with a solid grasp of languages like PHP, Python, C, C#, C++, and JavaScript, along with comfort using Bash and PowerShell command-line interfaces. My foundation spans cloud computing, artificial intelligence, and system maintenance, reinforced by both academic learning and hands-on project experience.",
    intro2: "I'm passionate about exploring new technologies and enjoy diving into diverse tools and languages, even outside formal settings. I thrive in collaborative, innovation-focused environments and am committed to continuous growth. I look forward to applying my skills meaningfully, contributing to dynamic teams, and expanding my technical horizons.",
    education: [
        { date: "Expected in July 2025", institution: "De Paul Institute of Science And Technology, Angamaly, Kerala", degree: "Integrated Master of Computer Application (MCA)" },
        { date: "March 2020", institution: "Technical Higher Secondary School, Aluva, Kerala", degree: "Plus 2" },
        { date: "July 2017", institution: "St. Mary's High School, Aluva, Kerala", degree: "SSLC" }
    ],
    languages: [
        { name: "Malayalam", level: "Native" },
        { name: "English", level: "Professional" },
        { name: "Hindi", level: "Beginner" }
    ],
    skills: ["Problem-Solving", "Adaptability"],
    profiles: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/melvinfrancy" },
        { name: "GitHub", url: "https://github.com/Melvinfused" }
    ]
};

const defaultProjectsData = [
    { title: "Artist Portfolio Website with Live Show Booking", description: "A sleek platform for showcasing an artist's work and managing live event bookings. It features a portfolio gallery, an easy-to-use booking system, and embedded music player.", link: "" },
    { title: "Personal Portfolio Website", description: "This is basically my space on the web to show off what I've been working on. It's where I put together all my projects, talk a bit about what I do, and list the skills I've picked up.", link: "" },
    { title: "Script to Read Aloud Weather Report", description: "My Weather and Air Quality Reader script is a Python tool that provides real-time weather, air quality, and wind updates for Kochi, India.", link: "" },
    { title: "Intelligent Relocation Service Management System", description: "A full-stack application for moving office and home goods. Customers can choose a truck based on size, with pricing calculated using open-source mapping and routing APIs.", link: "" }
];

const defaultCertsData = {
    certifications: [
        { name: "Career Essentials in Generative AI", org: "Microsoft & LinkedIn", year: "2023", link: "https://www.linkedin.com/learning/certificates/ace5594ca7bf4da20addc125787808fe1906304f4966fce8659fe92afb372a1d" },
        { name: "LFS101: Introduction to Linux", org: "The Linux Foundation", year: "2024", link: "https://www.credly.com/badges/6194a241-a84f-4249-8477-d6e03ccb2459/linked_in_profile" },
        { name: "Python Essentials 1", org: "Cisco", year: "2024", link: "https://www.credly.com/badges/6250dc1b-9072-498d-bb14-2405ddbd76bd/linked_in_profile" },
        { name: "Operating Systems Basics", org: "Cisco", year: "2024", link: "https://www.credly.com/badges/f571ea2e-62eb-4b3b-81e7-c9b2a0f56eac/linked_in_profile" },
        { name: "Computer Hardware Basics", org: "Cisco", year: "2024", link: "https://www.credly.com/badges/f8608d4b-0dc0-48e1-aa2f-d497aa0577d5/linked_in_profile" }
    ],
    techSkills: ["Web Development", "Python", "C#", "Cloud Computing", "Technical Troubleshooting", "Hardware Maintenance", "Operating Systems", "Computer Networks", "Artificial Intelligence"],
    badges: [] // Array of { name: string, image: base64string }
};

const PowerEdit = () => {
    const navigate = useNavigate();
    const { isEditMode } = useEditMode();
    const fileInputRef = useRef(null);

    // Initialize from portfolio.json file
    const [bioData, setBioData] = useState(portfolioData.bio || defaultBioData);
    const [projectsData, setProjectsData] = useState(portfolioData.projects || defaultProjectsData);
    const [certsData, setCertsData] = useState(portfolioData.certs || defaultCertsData);
    const [activeTab, setActiveTab] = useState("bio");
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Redirect if not in edit mode
    useEffect(() => {
        if (!isEditMode) {
            navigate("/");
        }
    }, [isEditMode, navigate]);

    // Save to backend API which writes to files
    const saveAll = async () => {
        setSaving(true);
        try {
            const response = await fetch('http://localhost:3001/api/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bio: bioData,
                    projects: projectsData,
                    certs: certsData
                })
            });

            if (response.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            } else {
                alert('Failed to save. Make sure the server is running (npm run dev:edit)');
            }
        } catch (error) {
            alert('Failed to save. Make sure the server is running (npm run dev:edit)');
            console.error('Save error:', error);
        }
        setSaving(false);
    };

    // Bio handlers
    const updateBioField = (field, value) => {
        setBioData(prev => ({ ...prev, [field]: value }));
    };

    const addEducation = () => {
        setBioData(prev => ({
            ...prev,
            education: [...prev.education, { date: "", institution: "", degree: "" }]
        }));
    };

    const updateEducation = (index, field, value) => {
        setBioData(prev => ({
            ...prev,
            education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
        }));
    };

    const removeEducation = (index) => {
        setBioData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const addLanguage = () => {
        setBioData(prev => ({
            ...prev,
            languages: [...prev.languages, { name: "", level: "" }]
        }));
    };

    const updateLanguage = (index, field, value) => {
        setBioData(prev => ({
            ...prev,
            languages: prev.languages.map((lang, i) => i === index ? { ...lang, [field]: value } : lang)
        }));
    };

    const removeLanguage = (index) => {
        setBioData(prev => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index)
        }));
    };

    const addSkill = () => {
        setBioData(prev => ({ ...prev, skills: [...prev.skills, ""] }));
    };

    const updateSkill = (index, value) => {
        setBioData(prev => ({
            ...prev,
            skills: prev.skills.map((s, i) => i === index ? value : s)
        }));
    };

    const removeSkill = (index) => {
        setBioData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const addProfile = () => {
        setBioData(prev => ({
            ...prev,
            profiles: [...prev.profiles, { name: "", url: "" }]
        }));
    };

    const updateProfile = (index, field, value) => {
        setBioData(prev => ({
            ...prev,
            profiles: prev.profiles.map((p, i) => i === index ? { ...p, [field]: value } : p)
        }));
    };

    const removeProfile = (index) => {
        setBioData(prev => ({
            ...prev,
            profiles: prev.profiles.filter((_, i) => i !== index)
        }));
    };

    // Projects handlers
    const addProject = () => {
        setProjectsData(prev => [...prev, { title: "", description: "", link: "" }]);
    };

    const updateProject = (index, field, value) => {
        setProjectsData(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const removeProject = (index) => {
        setProjectsData(prev => prev.filter((_, i) => i !== index));
    };

    // Certs handlers
    const addCertification = () => {
        setCertsData(prev => ({
            ...prev,
            certifications: [...prev.certifications, { name: "", org: "", year: "", link: "" }]
        }));
    };

    const updateCertification = (index, field, value) => {
        setCertsData(prev => ({
            ...prev,
            certifications: prev.certifications.map((c, i) => i === index ? { ...c, [field]: value } : c)
        }));
    };

    const removeCertification = (index) => {
        setCertsData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    const addTechSkill = () => {
        setCertsData(prev => ({ ...prev, techSkills: [...prev.techSkills, ""] }));
    };

    const updateTechSkill = (index, value) => {
        setCertsData(prev => ({
            ...prev,
            techSkills: prev.techSkills.map((s, i) => i === index ? value : s)
        }));
    };

    const removeTechSkill = (index) => {
        setCertsData(prev => ({
            ...prev,
            techSkills: prev.techSkills.filter((_, i) => i !== index)
        }));
    };

    // Badge handlers
    const handleBadgeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                // Upload to backend to save to file
                const response = await fetch('http://localhost:3001/api/upload-badge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: file.name, image: reader.result })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Store just the filename reference, not base64
                    setCertsData(prev => ({
                        ...prev,
                        customBadges: [...(prev.customBadges || []), { name: file.name, filename: data.filename }]
                    }));
                } else {
                    alert('Failed to upload. Make sure server is running.');
                }
            } catch (error) {
                alert('Failed to upload. Make sure server is running.');
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const removeBadge = async (index) => {
        const badge = certsData.customBadges[index];
        if (badge && badge.filename) {
            try {
                await fetch('http://localhost:3001/api/delete-badge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: badge.filename })
                });
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
        setCertsData(prev => ({
            ...prev,
            customBadges: prev.customBadges.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="power-edit">
            <div className="power-edit-header">
                <h1>Power Edit</h1>
                <div className="header-actions">
                    <button onClick={() => navigate("/")} className="btn-back">← Back</button>
                    <button onClick={saveAll} className="btn-save" disabled={saving}>
                        {saving ? "Saving..." : saved ? "✓ Saved to files!" : "Save All"}
                    </button>
                </div>
            </div>

            <div className="tabs">
                <button className={activeTab === "bio" ? "active" : ""} onClick={() => setActiveTab("bio")}>Bio</button>
                <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
                <button className={activeTab === "certs" ? "active" : ""} onClick={() => setActiveTab("certs")}>Certifications</button>
            </div>

            <div className="tab-content">
                {/* BIO TAB */}
                {activeTab === "bio" && (
                    <div className="section">
                        <h2>Introduction</h2>
                        <label>Intro Paragraph 1</label>
                        <textarea value={bioData.intro1} onChange={(e) => updateBioField("intro1", e.target.value)} rows={4} />

                        <label>Intro Paragraph 2</label>
                        <textarea value={bioData.intro2} onChange={(e) => updateBioField("intro2", e.target.value)} rows={4} />

                        <h2>Profiles <button className="btn-add" onClick={addProfile}>+ Add</button></h2>
                        {bioData.profiles.map((profile, i) => (
                            <div key={i} className="item-row">
                                <input placeholder="Name (e.g. LinkedIn)" value={profile.name} onChange={(e) => updateProfile(i, "name", e.target.value)} />
                                <input placeholder="URL" value={profile.url} onChange={(e) => updateProfile(i, "url", e.target.value)} />
                                <button className="btn-remove" onClick={() => removeProfile(i)}>×</button>
                            </div>
                        ))}

                        <h2>Education <button className="btn-add" onClick={addEducation}>+ Add</button></h2>
                        {bioData.education.map((edu, i) => (
                            <div key={i} className="item-card">
                                <input placeholder="Date (e.g. July 2025)" value={edu.date} onChange={(e) => updateEducation(i, "date", e.target.value)} />
                                <input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} />
                                <input placeholder="Degree/Qualification" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
                                <button className="btn-remove" onClick={() => removeEducation(i)}>× Remove</button>
                            </div>
                        ))}

                        <h2>Languages <button className="btn-add" onClick={addLanguage}>+ Add</button></h2>
                        {bioData.languages.map((lang, i) => (
                            <div key={i} className="item-row">
                                <input placeholder="Language" value={lang.name} onChange={(e) => updateLanguage(i, "name", e.target.value)} />
                                <input placeholder="Level" value={lang.level} onChange={(e) => updateLanguage(i, "level", e.target.value)} />
                                <button className="btn-remove" onClick={() => removeLanguage(i)}>×</button>
                            </div>
                        ))}

                        <h2>Soft Skills <button className="btn-add" onClick={addSkill}>+ Add</button></h2>
                        {bioData.skills.map((skill, i) => (
                            <div key={i} className="item-row">
                                <input placeholder="Skill" value={skill} onChange={(e) => updateSkill(i, e.target.value)} />
                                <button className="btn-remove" onClick={() => removeSkill(i)}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === "projects" && (
                    <div className="section">
                        <h2>Projects <button className="btn-add" onClick={addProject}>+ Add Project</button></h2>
                        {projectsData.map((project, i) => (
                            <div key={i} className="item-card">
                                <input placeholder="Project Title" value={project.title} onChange={(e) => updateProject(i, "title", e.target.value)} />
                                <label style={{ color: '#888', fontSize: '12px', marginTop: '5px' }}>Short Description (shown on card)</label>
                                <textarea placeholder="Brief description..." value={project.description} onChange={(e) => updateProject(i, "description", e.target.value)} rows={2} />
                                <label style={{ color: '#888', fontSize: '12px', marginTop: '5px' }}>Detailed Description (shown in popup)</label>
                                <textarea placeholder="Detailed description with more info... (optional)" value={project.details || ''} onChange={(e) => updateProject(i, "details", e.target.value)} rows={5} />
                                <input placeholder="Link (optional)" value={project.link} onChange={(e) => updateProject(i, "link", e.target.value)} />
                                <button className="btn-remove" onClick={() => removeProject(i)}>× Remove Project</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* CERTIFICATIONS TAB */}
                {activeTab === "certs" && (
                    <div className="section">
                        <h2>Certifications <button className="btn-add" onClick={addCertification}>+ Add</button></h2>
                        {certsData.certifications.map((cert, i) => (
                            <div key={i} className="item-card">
                                <input placeholder="Certificate Name" value={cert.name} onChange={(e) => updateCertification(i, "name", e.target.value)} />
                                <input placeholder="Organization" value={cert.org} onChange={(e) => updateCertification(i, "org", e.target.value)} />
                                <input placeholder="Year" value={cert.year} onChange={(e) => updateCertification(i, "year", e.target.value)} />
                                <input placeholder="Link (optional)" value={cert.link} onChange={(e) => updateCertification(i, "link", e.target.value)} />
                                <button className="btn-remove" onClick={() => removeCertification(i)}>× Remove</button>
                            </div>
                        ))}

                        <h2>Technical Skills <button className="btn-add" onClick={addTechSkill}>+ Add</button></h2>
                        {certsData.techSkills.map((skill, i) => (
                            <div key={i} className="item-row">
                                <input placeholder="Skill" value={skill} onChange={(e) => updateTechSkill(i, e.target.value)} />
                                <button className="btn-remove" onClick={() => removeTechSkill(i)}>×</button>
                            </div>
                        ))}

                        <h2>Badges <button className="btn-add" onClick={() => fileInputRef.current?.click()}>+ Upload Badge</button></h2>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleBadgeUpload}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <div className="badges-grid">
                            {(certsData.customBadges || []).map((badge, i) => (
                                <div key={i} className="badge-item">
                                    <img src={`/src/assets/Badges/${badge.filename}`} alt={badge.name} />
                                    <span>{badge.name}</span>
                                    <button className="btn-remove" onClick={() => removeBadge(i)}>×</button>
                                </div>
                            ))}
                            {(!certsData.customBadges || certsData.customBadges.length === 0) && (
                                <p className="no-badges">No custom badges uploaded yet. Click "+ Upload Badge" to add.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PowerEdit;

