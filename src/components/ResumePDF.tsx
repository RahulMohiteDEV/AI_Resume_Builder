import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 35,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  },

  header: {
    marginBottom: 2,
    paddingBottom: 0,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  leftHeader: {
    width: "60%",
  },

  rightHeader: {
    width: "40%",
    textAlign: "right",
  },

 name: {
  fontSize: 28,
  color: "#2B5DB9",
  fontWeight: "bold",
  marginBottom: 16,   // increase gap
  letterSpacing: 0.5,
},

  title: {
    fontSize: 12,
    color: "#4a4a4a",
    marginBottom: 4,
  },

  linkText: {
    color: "#2B5DB9",
    fontSize: 9,
    marginBottom: 4,
  },

  contactText: {
    fontSize: 9,
    marginBottom: 2,
    color: "#4a4a4a",
  },

  section: {
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 11,
    color: "#2B5DB9",
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginBottom: 6,
  },

  paragraph: {
    textAlign: "justify",
    fontSize: 9.5,
    lineHeight: 1.6,
  },

  skillRow: {
    marginBottom: 3,
    fontSize: 9.5,
  },

  label: {
    fontWeight: "bold",
    fontSize: 9.5,
  },

  experienceBlock: {
    marginBottom: 10,
  },

  jobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },

  role: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: "#1a1a1a",
  },

  company: {
    fontSize: 9.5,
    color: "#1a1a1a",
    marginBottom: 3,
    fontWeight: "bold",
   
  },

  dateText: {
   
     fontWeight: "bold",
    fontSize: 9,
    color: "#6b7280",
  },

  bullet: {
    marginLeft: 12,
    marginBottom: 2,
    fontSize: 9.5,
    lineHeight: 1.5,
  },

  projectTitle: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: "#1a1a1a",
    marginBottom: 3,
    marginTop: 6,
  },

  educationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },

  degree: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#1a1a1a",
  },

  institute: {
    fontSize: 9.5,
    color: "#4a4a4a",
  },

  certificationItem: {
    marginLeft: 12,
    marginBottom: 2,
    fontSize: 9.5,
  },

  achievementItem: {
    marginLeft: 12,
    marginBottom: 2,
    fontSize: 9.5,
  },

 linkRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 12,
  marginTop: 0,
},
});

// Format date to Month Year
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  } catch {
    return dateString;
  }
};

// Helper function to filter empty values
const getValidItems = (items: any[] | undefined): any[] => {
  if (!items || !Array.isArray(items)) return [];
  
  return items.filter((item) => {
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed === "" || trimmed === "." || trimmed === "-" || trimmed === ",") {
        return false;
      }
      if (trimmed.length === 1 && !/[a-zA-Z]/.test(trimmed)) {
        return false;
      }
      return true;
    }
    
    if (typeof item === "object" && item !== null) {
      const hasValidValue = Object.values(item).some((val) => {
        if (typeof val === "string") {
          const trimmed = val.trim();
          return trimmed !== "" && trimmed !== "." && trimmed !== "-";
        }
        return val !== null && val !== undefined && val !== "";
      });
      return hasValidValue;
    }
    
    return item !== null && item !== undefined;
  });
};

export default function ResumePDF({ resume }: { resume: any }) {
  
  // Filter arrays
  const validCertifications = getValidItems(resume.certifications);
  const validAchievements = getValidItems(resume.achievements);
  const validSkills = getValidItems(resume.skills);
  const validWorkExperience = getValidItems(resume.workExperience);
  const validProjects = getValidItems(resume.projects);
  const validEducation = getValidItems(resume.education);

  // Get personal info
  const personalInfo = resume.personalInfo || {};

  // ✅ FIX: Correct property names for links
  const githubUrl = personalInfo.github || personalInfo.githubUrl || "";
  const portfolioUrl = personalInfo.portfolio || personalInfo.portfolioUrl || "";
  const linkedinUrl = personalInfo.linkedIn || personalInfo.linkedinUrl || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <View style={styles.leftHeader}>
              {/* ✅ Name with increased gap below */}
              <Text style={styles.name}>
                {personalInfo.fullname || "Full Name"}
              </Text>
              
              <View style={{ height: 8 }} />

              {/* {resume.jobTitle && (
  <Text style={styles.title}>
    {resume.jobTitle}
  </Text>
)} */}

<View style={{ height: 4 }} />

              {/* ✅ Clickable links with vertical gap */}
         <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
  {githubUrl && (
    <Link
      src={githubUrl}
      style={{
        color: "#2B5DB9",
        fontSize: 9,
        marginRight: 15,
      }}
    >
      GitHub
    </Link>
  )}

  {portfolioUrl && (
    <Link
      src={portfolioUrl}
      style={{
        color: "#2B5DB9",
        fontSize: 9,
        marginRight: 15,
      }}
    >
      Portfolio
    </Link>
  )}

  {linkedinUrl && (
    <Link
      src={linkedinUrl}
      style={{
        color: "#2B5DB9",
        fontSize: 9,
      }}
    >
      LinkedIn
    </Link>
  )}
</View>
            </View>

            <View style={styles.rightHeader}>
              {personalInfo.email && (
                <Text style={styles.contactText}>
                  {personalInfo.email}
                </Text>
              )}
              {personalInfo.mobile && (
                <Text style={styles.contactText}>
                  {personalInfo.mobile}
                </Text>
              )}
              {/* Location commented out - will use later */}
              {/* {personalInfo.location && (
                <Text style={styles.contactText}>
                  {personalInfo.location}
                </Text>
              )} */}
            </View>
          </View>
        </View>

        {/* ================= SUMMARY ================= */}
        {resume.summary && resume.summary.trim() !== "" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PROFESSIONAL SUMMARY
            </Text>
            <View style={styles.divider} />
            <Text style={styles.paragraph}>
              {resume.summary}
            </Text>
          </View>
        )}

        {/* ================= SKILLS ================= */}
        {validSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              TECHNICAL SKILLS
            </Text>
            <View style={styles.divider} />
            <View style={styles.skillRow}>
              <Text>
                <Text style={styles.label}>
                  Skills:
                </Text>{" "}
                {validSkills.join(", ")}
              </Text>
            </View>
          </View>
        )}

        {/* ================= EXPERIENCE ================= */}
        {validWorkExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PROFESSIONAL EXPERIENCE
            </Text>
            <View style={styles.divider} />

            {validWorkExperience.map((exp: any, index: number) => (
              <View key={index} style={styles.experienceBlock}>
                <View style={styles.jobRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>

                {exp.description?.split("\n").filter(Boolean).map(
                  (point: string, i: number) => (
                    <Text key={i} style={styles.bullet}>
                      • {point}
                    </Text>
                  )
                )}
              </View>
            ))}
          </View>
        )}

        {/* ================= PROJECTS ================= */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PROJECTS
            </Text>
            <View style={styles.divider} />

            {validProjects.map((project: any, index: number) => (
              <View key={index}>
                {project.title && (
                  <Text style={styles.projectTitle}>
                    {project.title}
                  </Text>
                )}

                {project.description && (
                  <Text style={styles.bullet}>
                    • {project.description}
                  </Text>
                )}

                {project.techStack?.length > 0 && (
                  <Text style={styles.bullet}>
                    • Tech Stack: {project.techStack.join(", ")}
                  </Text>
                )}

                {project.githubUrl && (
                  <Text style={styles.bullet}>
                    • GitHub: {project.githubUrl}
                  </Text>
                )}

                {project.liveUrl && (
                  <Text style={styles.bullet}>
                    • Live URL: {project.liveUrl}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* ================= EDUCATION ================= */}
        {validEducation.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              EDUCATION
            </Text>
            <View style={styles.divider} />

            {validEducation.map((edu: any, index: number) => (
              <View key={index} style={styles.educationRow}>
                <View>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institute}>{edu.institute}</Text>
                </View>
                <Text style={styles.dateText}>
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ================= ACHIEVEMENTS ================= */}
        {validAchievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              ACHIEVEMENTS
            </Text>
            <View style={styles.divider} />

            {validAchievements.map((achievement: string, index: number) => (
              <Text key={index} style={styles.achievementItem}>
                • {achievement}
              </Text>
            ))}
          </View>
        )}

        {/* ================= CERTIFICATIONS ================= */}
        {validCertifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              CERTIFICATIONS
            </Text>
            <View style={styles.divider} />

            {validCertifications.map((cert: string, index: number) => (
              <Text key={index} style={styles.certificationItem}>
                • {cert}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}