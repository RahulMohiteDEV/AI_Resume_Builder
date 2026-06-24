import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.5,
  },

  header: {
    marginBottom: 15,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftHeader: {
    width: "55%",
  },

  rightHeader: {
    width: "45%",
    textAlign: "right",
  },

  name: {
    fontSize: 24,
    color: "#2B5DB9",
    fontWeight: "bold",
    marginBottom: 5,
  },

  linkText: {
    color: "#2B5DB9",
    fontSize: 10,
  },

  contactText: {
    fontSize: 10,
    marginBottom: 2,
  },

  section: {
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 11,
    color: "#2B5DB9",
    fontWeight: "bold",
    marginBottom: 5,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#9CA3AF",
    marginBottom: 8,
  },

  paragraph: {
    textAlign: "justify",
  },

  skillRow: {
    marginBottom: 4,
  },

  label: {
    fontWeight: "bold",
  },

  experienceBlock: {
    marginBottom: 10,
  },

  jobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  role: {
    fontWeight: "bold",
    fontSize: 11,
  },

  company: {
    marginBottom: 5,
  },

  bullet: {
    marginLeft: 12,
    marginBottom: 3,
  },

  projectTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 6,
  },

  educationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  degree: {
    fontWeight: "bold",
  },
});

export default function ResumePDF({
  resume,
}: {
  resume: any;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <View style={styles.topRow}>
            <View style={styles.leftHeader}>
              <Text style={styles.name}>
                {resume.personalInfo?.fullname}
              </Text>

              <Text style={styles.linkText}>
                GitHub | Portfolio
              </Text>
            </View>

            <View style={styles.rightHeader}>
              <Text style={styles.contactText}>
                {resume.personalInfo?.email}
              </Text>

              <Text style={styles.contactText}>
                {resume.personalInfo?.mobile}
              </Text>

              <Text style={styles.contactText}>
                {resume.personalInfo?.location}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= SUMMARY ================= */}

        {resume.summary && (
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
              {resume.skills?.join(", ")}
            </Text>
          </View>
        </View>

        {/* ================= EXPERIENCE ================= */}

        {resume.workExperience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PROFESSIONAL EXPERIENCE
            </Text>

            <View style={styles.divider} />

            {resume.workExperience.map(
              (exp: any, index: number) => (
                <View
                  key={index}
                  style={styles.experienceBlock}
                >
                  <View style={styles.jobRow}>
                    <Text style={styles.role}>
                      {exp.role}
                    </Text>

                    <Text>
                      {exp.startDate} -{" "}
                      {exp.endDate}
                    </Text>
                  </View>

                  <Text style={styles.company}>
                    {exp.company}
                  </Text>

                  {exp.description
                    ?.split("\n")
                    .filter(Boolean)
                    .map(
                      (
                        point: string,
                        i: number
                      ) => (
                        <Text
                          key={i}
                          style={styles.bullet}
                        >
                          • {point}
                        </Text>
                      )
                    )}
                </View>
              )
            )}
          </View>
        )}

        {/* ================= PROJECTS ================= */}

        {resume.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PROJECTS
            </Text>

            <View style={styles.divider} />

            {resume.projects.map(
              (
                project: any,
                index: number
              ) => (
                <View key={index}>
                  <Text
                    style={styles.projectTitle}
                  >
                    {project.title}
                  </Text>

                  <Text style={styles.bullet}>
                    • {project.description}
                  </Text>

                  {project.techStack
                    ?.length > 0 && (
                    <Text style={styles.bullet}>
                      • Tech Stack:{" "}
                      {project.techStack.join(
                        ", "
                      )}
                    </Text>
                  )}

                  {project.githubUrl && (
                    <Text style={styles.bullet}>
                      • GitHub:{" "}
                      {project.githubUrl}
                    </Text>
                  )}

                  {project.liveUrl && (
                    <Text style={styles.bullet}>
                      • Live URL:{" "}
                      {project.liveUrl}
                    </Text>
                  )}
                </View>
              )
            )}
          </View>
        )}

        {/* ================= EDUCATION ================= */}

        {resume.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              EDUCATION
            </Text>

            <View style={styles.divider} />

            {resume.education.map(
              (
                edu: any,
                index: number
              ) => (
                <View
                  key={index}
                  style={styles.educationRow}
                >
                  <View>
                    <Text
                      style={styles.degree}
                    >
                      {edu.degree}
                    </Text>

                    <Text>
                      {edu.institute}
                    </Text>
                  </View>

                  <Text>
                    {edu.startDate} -{" "}
                    {edu.endDate}
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        {/* ================= CERTIFICATIONS ================= */}

        {resume.certifications
          ?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              CERTIFICATIONS
            </Text>

            <View style={styles.divider} />

            {resume.certifications.map(
              (
                cert: string,
                index: number
              ) => (
                <Text
                  key={index}
                  style={styles.bullet}
                >
                  • {cert}
                </Text>
              )
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}