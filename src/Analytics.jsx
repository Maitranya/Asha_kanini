import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
} from "recharts";
import {
  School, Users, Target, TrendingUp, BarChart3, Compass, Layers,
  GraduationCap, Smartphone, Search, Download, ChevronRight, Info,
  ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";

const DATA = {"kpis": {"totalSchools": 278, "totalStudentsAssessed": 7334, "totalAssessmentsConducted": 20000, "participationRate": 50.7, "avgScorePct": 41.9, "yearRange": [2016, 2026], "usageSchools": 129, "usageEvents": 20000, "usageDateRange": ["2021-12-24 16:07:25", "2022-01-20 17:00:59"]}, "performanceBySubjectClass": [{"subject": "English", "class": 2, "avgPct": 60.1, "n": 806}, {"subject": "English", "class": 3, "avgPct": 48.3, "n": 1274}, {"subject": "English", "class": 4, "avgPct": 37.4, "n": 1328}, {"subject": "English", "class": 5, "avgPct": 28.8, "n": 1405}, {"subject": "Maths", "class": 2, "avgPct": 44.3, "n": 1330}, {"subject": "Maths", "class": 3, "avgPct": 43.2, "n": 1271}, {"subject": "Maths", "class": 4, "avgPct": 37.9, "n": 1321}, {"subject": "Maths", "class": 5, "avgPct": 43.6, "n": 1409}], "trendsBySubjectYear": [{"subject": "English", "year": 2016, "avgPct": 33.2, "n": 514}, {"subject": "Maths", "year": 2016, "avgPct": 47.8, "n": 710}, {"subject": "English", "year": 2017, "avgPct": 42.8, "n": 1131}, {"subject": "Maths", "year": 2017, "avgPct": 42.4, "n": 1462}, {"subject": "English", "year": 2018, "avgPct": 44.0, "n": 1168}, {"subject": "Maths", "year": 2018, "avgPct": 41.5, "n": 1166}, {"subject": "English", "year": 2019, "avgPct": 44.4, "n": 1076}, {"subject": "Maths", "year": 2019, "avgPct": 43.2, "n": 1071}, {"subject": "English", "year": 2020, "avgPct": 39.6, "n": 860}, {"subject": "Maths", "year": 2020, "avgPct": 38.9, "n": 858}, {"subject": "English", "year": 2022, "avgPct": 20.3, "n": 64}, {"subject": "Maths", "year": 2022, "avgPct": 21.8, "n": 64}], "topicAccuracy": [{"topic": "Odd and Even number", "subject": "Maths", "attempts": 36, "accuracyPct": 16.7}, {"topic": "Rhyming words", "subject": "English", "attempts": 243, "accuracyPct": 24.0}, {"topic": "Picture comprehension", "subject": "English", "attempts": 63, "accuracyPct": 29.3}, {"topic": "Measurement", "subject": "Maths", "attempts": 475, "accuracyPct": 29.8}, {"topic": "Reading Comprehension", "subject": "English", "attempts": 1106, "accuracyPct": 30.8}, {"topic": "Addition-Subtraction Property", "subject": "Maths", "attempts": 641, "accuracyPct": 33.9}, {"topic": "Multiplication-Division Property", "subject": "Maths", "attempts": 392, "accuracyPct": 39.2}, {"topic": "Division", "subject": "Maths", "attempts": 850, "accuracyPct": 40.0}, {"topic": "Addition with fill in the blanks", "subject": "Maths", "attempts": 50, "accuracyPct": 41.7}, {"topic": "Punctuation", "subject": "English", "attempts": 993, "accuracyPct": 42.3}, {"topic": "Sentence", "subject": "English", "attempts": 3554, "accuracyPct": 42.8}, {"topic": "Short form", "subject": "Maths", "attempts": 88, "accuracyPct": 43.2}, {"topic": "Subtraction with change", "subject": "Maths", "attempts": 1301, "accuracyPct": 46.4}, {"topic": "Grammar", "subject": "English", "attempts": 279, "accuracyPct": 46.7}, {"topic": "Translate from Tamil to English", "subject": "English", "attempts": 284, "accuracyPct": 47.0}, {"topic": "Time", "subject": "Maths", "attempts": 145, "accuracyPct": 47.5}, {"topic": "Addition", "subject": "Maths", "attempts": 102, "accuracyPct": 48.3}, {"topic": "Multiplication", "subject": "Maths", "attempts": 1662, "accuracyPct": 50.3}, {"topic": "Translate from English to Tamil", "subject": "English", "attempts": 231, "accuracyPct": 51.0}, {"topic": "Word problem", "subject": "Maths", "attempts": 210, "accuracyPct": 52.1}, {"topic": "Spelling", "subject": "English", "attempts": 324, "accuracyPct": 52.2}, {"topic": "Number Concept", "subject": "Maths", "attempts": 2873, "accuracyPct": 52.2}, {"topic": "Money", "subject": "Maths", "attempts": 32, "accuracyPct": 53.6}, {"topic": "Vocabulary", "subject": "English", "attempts": 4358, "accuracyPct": 55.5}, {"topic": "Zero property", "subject": "Maths", "attempts": 128, "accuracyPct": 57.4}, {"topic": "Expanded form", "subject": "Maths", "attempts": 95, "accuracyPct": 58.2}, {"topic": "Factor", "subject": "Maths", "attempts": 40, "accuracyPct": 59.0}, {"topic": "Estimation", "subject": "Maths", "attempts": 42, "accuracyPct": 60.0}, {"topic": "Subtraction with fill in the blanks", "subject": "Maths", "attempts": 40, "accuracyPct": 60.0}, {"topic": "Addition without change", "subject": "Maths", "attempts": 1268, "accuracyPct": 61.0}, {"topic": "Fraction", "subject": "Maths", "attempts": 368, "accuracyPct": 63.4}, {"topic": "Comparison", "subject": "Maths", "attempts": 180, "accuracyPct": 64.9}, {"topic": "Numerals", "subject": "Maths", "attempts": 726, "accuracyPct": 65.7}, {"topic": "Shapes", "subject": "Maths", "attempts": 266, "accuracyPct": 66.3}, {"topic": "Addition Word Problem", "subject": "Maths", "attempts": 427, "accuracyPct": 68.5}, {"topic": "Subtraction", "subject": "Maths", "attempts": 84, "accuracyPct": 70.9}, {"topic": "Geometry", "subject": "Maths", "attempts": 168, "accuracyPct": 77.1}, {"topic": "Skip counting", "subject": "Maths", "attempts": 32, "accuracyPct": 78.6}, {"topic": "picture identification", "subject": "English", "attempts": 180, "accuracyPct": 80.0}], "correlationMotherEd": [{"level": "NA", "avgPct": 42.6, "n": 14}, {"level": "NONE", "avgPct": 32.2, "n": 757}, {"level": "PRIMARY", "avgPct": 37.7, "n": 855}, {"level": "MIDDLE", "avgPct": 42.8, "n": 893}, {"level": "HIGH", "avgPct": 47.7, "n": 986}, {"level": "HIGHER SECONDARY", "avgPct": 42.9, "n": 346}, {"level": "DIPLOMA", "avgPct": 41.6, "n": 14}, {"level": "BACHELORS", "avgPct": 58.8, "n": 60}], "correlationFatherEd": [{"level": "NA", "avgPct": 51.3, "n": 32}, {"level": "NONE", "avgPct": 29.2, "n": 724}, {"level": "PRIMARY", "avgPct": 37.2, "n": 735}, {"level": "MIDDLE", "avgPct": 42.6, "n": 719}, {"level": "HIGH", "avgPct": 48.1, "n": 1143}, {"level": "HIGHER SECONDARY", "avgPct": 43.7, "n": 444}, {"level": "DIPLOMA", "avgPct": 47.6, "n": 32}, {"level": "BACHELORS", "avgPct": 50.8, "n": 82}, {"level": "MASTERS", "avgPct": 48.2, "n": 12}], "correlationTuition": [{"label": "No", "avgPct": 40.8, "n": 1156}, {"label": "Yes", "avgPct": 36.1, "n": 550}], "correlationBreakfast": [{"label": "No", "avgPct": 31.1, "n": 32}, {"label": "Yes", "avgPct": 39.5, "n": 1674}], "correlationHomework": [{"label": "No", "avgPct": 27.1, "n": 286}, {"label": "N/A", "avgPct": 55.8, "n": 30}, {"label": "Yes", "avgPct": 39.8, "n": 1518}], "genderGap": [{"label": "Boys", "avgPct": 40.0, "n": 4592}, {"label": "Girls", "avgPct": 43.5, "n": 5552}], "byLocationType": [{"label": "Rural", "avgPct": 42.0, "n": 8648}, {"label": "Urban", "avgPct": 44.5, "n": 238}], "oralVsFull": [{"label": "Written/Mixed", "avgPct": 42.8, "n": 2431}, {"label": "Full Oral", "avgPct": 41.6, "n": 7713}], "topActions": [{"action": "Content Opened", "count": 6465}, {"action": "Content Closed", "count": 3696}, {"action": "Search For", "count": 3457}, {"action": "Content Launched", "count": 1203}, {"action": "Applaunch", "count": 982}, {"action": "Content Download", "count": 935}, {"action": "Search Content", "count": 757}, {"action": "Liked", "count": 584}, {"action": "Opened Registration", "count": 503}, {"action": "Registration", "count": 371}, {"action": "Settings", "count": 326}, {"action": "Package Download", "count": 131}], "topSubjectsOpened": [{"subject": "Maths", "count": 641}, {"subject": "English", "count": 489}, {"subject": "Social Science", "count": 214}, {"subject": "Science", "count": 161}, {"subject": "Tamil", "count": 101}, {"subject": "Computer Science", "count": 84}, {"subject": "EVS", "count": 24}, {"subject": "Computer science", "count": 3}], "topContentOpened": [{"title": "The Universe and Solar System", "count": 204}, {"title": "Trip to the store \u2013 Lesson plan", "count": 94}, {"title": "Base Blocks", "count": 60}, {"title": "Solar system", "count": 53}, {"title": "Solar System for Kids", "count": 42}, {"title": "King of math(Addition and Subtraction)", "count": 18}, {"title": "Diffy", "count": 17}, {"title": "Numbers \u2013 Lesson plan", "count": 15}, {"title": "Geometry \u2013 Lesson plan", "count": 14}, {"title": "Action & nouns", "count": 14}, {"title": "Numbers", "count": 13}, {"title": "My pet \u2013 Lesson plan", "count": 13}], "schoolsPerYear": [{"year": 2023, "n": 128}, {"year": 2024, "n": 134}, {"year": 2025, "n": 131}, {"year": 2026, "n": 135}]};

const SUBJECT_COLOR = {
  Maths: "#FBBF24",
  English: "#5EEAD4",
  Tamil: "#A78BFA",
  "Social Science": "#34D399",
  Science: "#FB7185",
  "Computer Science": "#60A5FA",
  EVS: "#F472B6",
};
function subjectColor(s) {
  return SUBJECT_COLOR[s] || "#93A0BE";
}

function accuracyColor(pct) {
  if (pct < 35) return "#FB7185";
  if (pct < 55) return "#FBBF24";
  return "#34D399";
}

const TABS = [
  { id: "overview", label: "Overview", icon: Compass },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "influences", label: "What Influences Scores", icon: Layers },
  { id: "engagement", label: "Content Engagement", icon: Smartphone },
];

function KpiCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon" style={accent ? { background: accent } : undefined}>
        <Icon size={18} />
      </div>
      <div className="kpi-body">
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{label}</div>
        {sub && <div className="kpi-sub">{sub}</div>}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, note }) {
  return (
    <div className="section-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function CustomTooltip({ active, payload, label, suffix }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row">
          <span className="tooltip-dot" style={{ background: p.color || p.fill }} />
          <span>{p.name}: <strong>{p.value}{suffix || ""}</strong></span>
        </div>
      ))}
    </div>
  );
}

function OverviewTab() {
  const k = DATA.kpis;
  const classesBySubject = useMemo(() => {
    const map = {};
    DATA.performanceBySubjectClass.forEach((r) => {
      map[r.class] = map[r.class] || { class: `Class ${r.class}` };
      map[r.class][r.subject] = r.avgPct;
    });
    return Object.values(map).sort((a, b) => a.class.localeCompare(b.class, undefined, { numeric: true }));
  }, []);
  const subjects = [...new Set(DATA.performanceBySubjectClass.map((r) => r.subject))];

  return (
    <>
      <div className="kpi-grid">
        <KpiCard icon={School} label="Schools assessed" value={k.totalSchools.toLocaleString()} />
        <KpiCard icon={Users} label="Students assessed" value={k.totalStudentsAssessed.toLocaleString()} />
        <KpiCard icon={Target} label="Average score" value={`${k.avgScorePct}%`} accent="#F2A93B" />
        <KpiCard icon={GraduationCap} label="Participation rate" value={`${k.participationRate}%`} sub="of enrolled students scored" />
        <KpiCard icon={TrendingUp} label="Years of data" value={`${k.yearRange[0]}–${k.yearRange[1]}`} />
        <KpiCard icon={Smartphone} label="Schools using the app" value={k.usageSchools.toLocaleString()} sub="in this usage sample" />
      </div>

      <SectionHeader
        eyebrow="Quick read"
        title="Average score by subject and class"
        note="Every score is normalized to a percentage of that paper's maximum marks, so subjects and classes are comparable side by side."
      />
      <div className="chart-card">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={classesBySubject} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="#263354" vertical={false} />
            <XAxis dataKey="class" tick={{ fontSize: 12, fill: "#93A0BE" }} axisLine={{ stroke: "#263354" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#93A0BE" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip suffix="%" />} cursor={{ fill: "rgba(94,234,212,0.06)" }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            {subjects.map((s) => (
              <Bar key={s} dataKey={s} fill={subjectColor(s)} radius={[6, 6, 0, 0]} maxBarSize={36} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="callout">
        <Info size={16} />
        <p>
          This dashboard reads a sample export from the assessment portal (database name:
          <code> samplekanini</code>) — treat exact figures as illustrative of what the full
          dataset would show, not final production numbers. Usage-activity data covers a
          {" "}{k.usageDateRange[0].slice(0, 10)} to {k.usageDateRange[1].slice(0, 10)} window in this sample.
        </p>
      </div>
    </>
  );
}

function PerformanceTab() {
  const classesBySubject = useMemo(() => {
    const map = {};
    DATA.performanceBySubjectClass.forEach((r) => {
      map[r.class] = map[r.class] || { class: `Class ${r.class}` };
      map[r.class][r.subject] = r.avgPct;
    });
    return Object.values(map).sort((a, b) => a.class.localeCompare(b.class, undefined, { numeric: true }));
  }, []);
  const subjects = [...new Set(DATA.performanceBySubjectClass.map((r) => r.subject))];

  const yearsBySubject = useMemo(() => {
    const map = {};
    DATA.trendsBySubjectYear.forEach((r) => {
      map[r.year] = map[r.year] || { year: r.year };
      map[r.year][r.subject] = r.avgPct;
    });
    return Object.values(map).sort((a, b) => a.year - b.year);
  }, []);

  const weakest = DATA.topicAccuracy.slice(0, 10);
  const strongest = [...DATA.topicAccuracy].slice(-6).reverse();

  return (
    <>
      <SectionHeader
        eyebrow="Subject × Class"
        title="Where scores are highest and lowest"
        note="Grouped by class, one bar per subject — a fast way to spot which class/subject combinations need attention."
      />
      <div className="chart-card">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={classesBySubject} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="#263354" vertical={false} />
            <XAxis dataKey="class" tick={{ fontSize: 12, fill: "#93A0BE" }} axisLine={{ stroke: "#263354" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#93A0BE" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip suffix="%" />} cursor={{ fill: "rgba(94,234,212,0.06)" }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            {subjects.map((s) => (
              <Bar key={s} dataKey={s} fill={subjectColor(s)} radius={[6, 6, 0, 0]} maxBarSize={36} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <SectionHeader
        eyebrow="Over time"
        title="Score trends across years"
        note="Sparse years reflect how much of that year is present in this sample export, not necessarily low real performance."
      />
      <div className="chart-card">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={yearsBySubject} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="#263354" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#93A0BE" }} axisLine={{ stroke: "#263354" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#93A0BE" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip suffix="%" />} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            {["Maths", "English"].map((s) => (
              <Line key={s} type="monotone" dataKey={s} stroke={subjectColor(s)} strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <SectionHeader
        eyebrow="Topic / slice analysis"
        title="Which topics students struggle with most"
        note={`Accuracy = correct answers among attempted questions, for topics with 30+ attempts in this sample.`}
      />
      <div className="two-col">
        <div className="chart-card">
          <h3 className="mini-title"><ArrowDownRight size={15} color="#E4572E" /> Needs the most attention</h3>
          {weakest.map((t) => (
            <div className="topic-bar-row" key={t.topic}>
              <div className="topic-bar-label">
                <span>{t.topic}</span>
                <span className="topic-subject-chip" style={{ color: subjectColor(t.subject) }}>{t.subject}</span>
              </div>
              <div className="topic-bar-track">
                <div className="topic-bar-fill" style={{ width: `${t.accuracyPct}%`, background: accuracyColor(t.accuracyPct) }} />
              </div>
              <span className="topic-bar-pct">{t.accuracyPct}%</span>
            </div>
          ))}
        </div>
        <div className="chart-card">
          <h3 className="mini-title"><ArrowUpRight size={15} color="#5B8C5A" /> Strongest topics</h3>
          {strongest.map((t) => (
            <div className="topic-bar-row" key={t.topic}>
              <div className="topic-bar-label">
                <span>{t.topic}</span>
                <span className="topic-subject-chip" style={{ color: subjectColor(t.subject) }}>{t.subject}</span>
              </div>
              <div className="topic-bar-track">
                <div className="topic-bar-fill" style={{ width: `${t.accuracyPct}%`, background: accuracyColor(t.accuracyPct) }} />
              </div>
              <span className="topic-bar-pct">{t.accuracyPct}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ComparisonBars({ data, valueKey = "avgPct", labelKey = "label", colorFn }) {
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="compare-bars">
      {data.map((d, i) => (
        <div className="compare-row" key={d[labelKey]}>
          <span className="compare-label">{d[labelKey]}</span>
          <div className="compare-track">
            <div
              className="compare-fill"
              style={{
                width: `${(d[valueKey] / max) * 100}%`,
                background: colorFn ? colorFn(d, i) : "#3E8FB0",
              }}
            />
          </div>
          <span className="compare-value">{d[valueKey]}%</span>
          <span className="compare-n">n={d.n.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function InfluencesTab() {
  return (
    <>
      <SectionHeader
        eyebrow="Family background"
        title="Parental education vs. average score"
        note="Sorted from no formal education to postgraduate — a consistent upward pattern here (not a causal claim) is one of the strongest signals in this dataset."
      />
      <div className="two-col">
        <div className="chart-card">
          <h3 className="mini-title">Mother's education</h3>
          <ComparisonBars data={DATA.correlationMotherEd} colorFn={() => "#5EEAD4"} />
        </div>
        <div className="chart-card">
          <h3 className="mini-title">Father's education</h3>
          <ComparisonBars data={DATA.correlationFatherEd} colorFn={() => "#A78BFA"} />
        </div>
      </div>

      <SectionHeader eyebrow="Everyday factors" title="Home life and daily habits" />
      <div className="three-col">
        <div className="chart-card compact">
          <h3 className="mini-title">Goes to tuition?</h3>
          <ComparisonBars data={DATA.correlationTuition} colorFn={() => "#FBBF24"} />
        </div>
        <div className="chart-card compact">
          <h3 className="mini-title">Eats breakfast?</h3>
          <ComparisonBars data={DATA.correlationBreakfast} colorFn={() => "#FB7185"} />
        </div>
        <div className="chart-card compact">
          <h3 className="mini-title">Does homework regularly?</h3>
          <ComparisonBars data={DATA.correlationHomework} colorFn={() => "#34D399"} />
        </div>
      </div>

      <SectionHeader eyebrow="Groups" title="Gender, location, and assessment style" />
      <div className="three-col">
        <div className="chart-card compact">
          <h3 className="mini-title">By gender</h3>
          <ComparisonBars data={DATA.genderGap} colorFn={(d) => (d.label === "Girls" ? "#FB7185" : "#60A5FA")} />
        </div>
        <div className="chart-card compact">
          <h3 className="mini-title">By school location</h3>
          <ComparisonBars data={DATA.byLocationType} colorFn={() => "#34D399"} />
        </div>
        <div className="chart-card compact">
          <h3 className="mini-title">Oral vs. written/mixed</h3>
          <ComparisonBars data={DATA.oralVsFull} colorFn={() => "#A78BFA"} />
        </div>
      </div>

      <div className="callout">
        <Info size={16} />
        <p>
          These are correlations, not proof of cause and effect — e.g. tuition-goers scoring
          lower likely reflects that struggling students are more often sent to tuition, not
          that tuition itself hurts scores. Useful for spotting patterns worth investigating,
          not for final conclusions.
        </p>
      </div>
    </>
  );
}

function EngagementTab() {
  const maxAction = Math.max(...DATA.topActions.map((a) => a.count));
  const maxSubject = Math.max(...DATA.topSubjectsOpened.map((s) => s.count));
  const maxContent = Math.max(...DATA.topContentOpened.map((c) => c.count));

  return (
    <>
      <SectionHeader
        eyebrow="App usage telemetry"
        title="What students actually do in the app"
        note={`From ${DATA.kpis.usageEvents.toLocaleString()} logged actions across ${DATA.kpis.usageSchools} schools in this sample window.`}
      />
      <div className="chart-card">
        <h3 className="mini-title">Most common actions</h3>
        <div className="funnel">
          {DATA.topActions.map((a) => (
            <div className="funnel-row" key={a.action}>
              <span className="funnel-label">{a.action}</span>
              <div className="funnel-track">
                <div className="funnel-fill" style={{ width: `${(a.count / maxAction) * 100}%` }} />
              </div>
              <span className="funnel-value">{a.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        <div className="chart-card">
          <h3 className="mini-title">Subjects opened most</h3>
          <div className="funnel">
            {DATA.topSubjectsOpened.map((s) => (
              <div className="funnel-row" key={s.subject}>
                <span className="funnel-label">{s.subject}</span>
                <div className="funnel-track">
                  <div className="funnel-fill" style={{ width: `${(s.count / maxSubject) * 100}%`, background: subjectColor(s.subject) }} />
                </div>
                <span className="funnel-value">{s.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="mini-title">Most-opened content</h3>
          <div className="ranked-list">
            {DATA.topContentOpened.map((c, i) => (
              <div className="ranked-row" key={c.title}>
                <span className="ranked-index">{i + 1}</span>
                <span className="ranked-title">{c.title}</span>
                <span className="ranked-count">{c.count}×</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="callout">
        <Info size={16} />
        <p>
          "Opened" reflects a click into content, not confirmed watch-time — most duration
          values in this sample are near-zero, so genuine engagement depth isn't measurable
          from this export alone.
        </p>
      </div>
    </>
  );
}

export default function Analytics() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="analytics-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        :root {
          --bg: #0F1729;
          --bg-2: #1A2540;
          --bg-3: #212D4D;
          --ink: #E8ECF4;
          --ink-soft: #93A0BE;
          --ink-faint: #5C6C90;
          --teal: #5EEAD4;
          --amber: #FBBF24;
          --violet: #A78BFA;
          --rose: #FB7185;
          --emerald: #34D399;
          --blue: #60A5FA;
          --line: #263354;
          color-scheme: dark;
        }
        * { box-sizing: border-box; }
        .analytics-root {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--ink);
          min-height: 100vh;
          color-scheme: dark;
        }
        .analytics-root h1, .analytics-root h2, .analytics-root h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          margin: 0;
        }

        .analytics-header {
          background: #0B1220;
          color: var(--ink);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid var(--line);
        }
        .brand-row { display: flex; align-items: center; gap: 10px; }
        .brand-badge {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, var(--teal), var(--blue));
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          color: #0B1220;
        }
        .brand-text h1 { font-size: 16px; color: var(--ink); line-height: 1.1; }
        .brand-text span { font-size: 10.5px; color: var(--ink-faint); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.03em; }

        .sample-badge {
          background: rgba(94,234,212,0.08);
          color: var(--teal);
          font-size: 11.5px;
          font-family: 'JetBrains Mono', monospace;
          padding: 5px 10px;
          border-radius: 999px;
          border: 1px solid rgba(94,234,212,0.25);
        }

        .tab-nav {
          display: flex;
          gap: 4px;
          background: var(--bg-2);
          border-bottom: 1px solid var(--line);
          padding: 0 24px;
          overflow-x: auto;
        }
        .tab-btn {
          display: flex; align-items: center; gap: 7px;
          background: none; border: none;
          padding: 14px 16px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13.5px;
          color: var(--ink-faint);
          cursor: pointer;
          border-bottom: 2.5px solid transparent;
          white-space: nowrap;
        }
        .tab-btn:hover { color: var(--ink); }
        .tab-btn-active { color: var(--teal); border-bottom-color: var(--teal); }

        .analytics-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 24px 64px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 12px;
          margin-bottom: 8px;
        }
        .kpi-card {
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .kpi-icon {
          width: 36px; height: 36px;
          background: var(--bg-3);
          color: var(--teal);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .kpi-icon[style] { color: #0B1220; }
        .kpi-value { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 600; color: var(--ink); line-height: 1.1; }
        .kpi-label { font-size: 12px; color: var(--ink-soft); margin-top: 3px; font-weight: 600; }
        .kpi-sub { font-size: 10.5px; color: var(--ink-faint); margin-top: 2px; }

        .section-header { margin: 32px 0 14px; }
        .section-header .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--blue); font-weight: 600;
        }
        .section-header h2 { font-size: 20px; color: var(--ink); margin: 4px 0 6px; }
        .section-note { font-size: 13px; color: var(--ink-soft); margin: 0; max-width: 640px; line-height: 1.45; }

        .chart-card {
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 20px;
        }
        .chart-card.compact { padding: 16px; }
        .mini-title {
          font-size: 14px; font-weight: 600; color: var(--ink);
          display: flex; align-items: center; gap: 6px;
          margin: 0 0 14px;
        }

        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 16px; }

        .chart-tooltip {
          background: #060A14; color: var(--ink);
          padding: 10px 12px; border-radius: 10px; font-size: 12.5px;
          border: 1px solid var(--line);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .tooltip-label { font-weight: 700; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif; }
        .tooltip-row { display: flex; align-items: center; gap: 6px; margin-top: 2px; color: var(--ink-soft); }
        .tooltip-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }

        .topic-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .topic-bar-label {
          width: 180px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 1px;
          font-size: 12.5px; font-weight: 600; color: var(--ink);
        }
        .topic-subject-chip { font-size: 10.5px; font-weight: 600; }
        .topic-bar-track { flex: 1; height: 10px; background: var(--bg-3); border-radius: 999px; overflow: hidden; }
        .topic-bar-fill { height: 100%; border-radius: 999px; }
        .topic-bar-pct { font-size: 12px; font-weight: 700; color: var(--ink-soft); width: 38px; text-align: right; font-family: 'JetBrains Mono', monospace; }

        .compare-bars { display: flex; flex-direction: column; gap: 12px; }
        .compare-row { display: flex; align-items: center; gap: 10px; }
        .compare-label { width: 110px; flex-shrink: 0; font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .compare-track { flex: 1; height: 12px; background: var(--bg-3); border-radius: 999px; overflow: hidden; }
        .compare-fill { height: 100%; border-radius: 999px; }
        .compare-value { font-size: 12.5px; font-weight: 700; color: var(--ink); width: 40px; text-align: right; font-family: 'JetBrains Mono', monospace; }
        .compare-n { font-size: 10.5px; color: var(--ink-faint); width: 55px; font-family: 'JetBrains Mono', monospace; }

        .funnel { display: flex; flex-direction: column; gap: 10px; }
        .funnel-row { display: flex; align-items: center; gap: 10px; }
        .funnel-label { width: 140px; flex-shrink: 0; font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .funnel-track { flex: 1; height: 14px; background: var(--bg-3); border-radius: 999px; overflow: hidden; }
        .funnel-fill { height: 100%; border-radius: 999px; background: var(--blue); }
        .funnel-value { font-size: 12px; font-weight: 700; color: var(--ink-soft); width: 50px; text-align: right; font-family: 'JetBrains Mono', monospace; }

        .ranked-list { display: flex; flex-direction: column; }
        .ranked-row {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid var(--bg-3);
        }
        .ranked-row:last-child { border-bottom: none; }
        .ranked-index {
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--bg-3); color: var(--teal);
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-family: 'Space Grotesk', sans-serif;
        }
        .ranked-title { flex: 1; font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .ranked-count { font-size: 12px; color: var(--teal); font-weight: 700; font-family: 'JetBrains Mono', monospace; }

        .callout {
          display: flex; gap: 10px; align-items: flex-start;
          background: var(--bg-2); border: 1px solid var(--line); border-radius: 14px;
          padding: 14px 16px; margin-top: 24px;
          color: var(--ink-soft); font-size: 12.5px; line-height: 1.5;
        }
        .callout svg { flex-shrink: 0; margin-top: 1px; color: var(--blue); }
        .callout code {
          background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 4px;
          font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
          color: var(--teal);
        }

        @media (max-width: 760px) {
          .two-col, .three-col { grid-template-columns: 1fr; }
          .topic-bar-label { width: 120px; }
        }
      `}</style>

      <header className="analytics-header">
        <div className="brand-row">
          <div className="brand-badge"><BarChart3 size={18} /></div>
          <div className="brand-text">
            <h1>Kanini Padhai · Analytics</h1>
            <span>ASSESSMENT & USAGE INSIGHTS</span>
          </div>
        </div>
        <span className="sample-badge">Sample data export · {DATA.kpis.yearRange[0]}–{DATA.kpis.yearRange[1]}</span>
      </header>

      <nav className="tab-nav">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={"tab-btn" + (tab === t.id ? " tab-btn-active" : "")}
              onClick={() => setTab(t.id)}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </nav>

      <main className="analytics-main">
        {tab === "overview" && <OverviewTab />}
        {tab === "performance" && <PerformanceTab />}
        {tab === "influences" && <InfluencesTab />}
        {tab === "engagement" && <EngagementTab />}
      </main>
    </div>
  );
}
