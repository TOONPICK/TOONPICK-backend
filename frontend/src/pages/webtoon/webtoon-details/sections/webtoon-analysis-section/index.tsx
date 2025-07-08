import React, { useState } from 'react';
import {WebtoonAnalysisData, WebtoonDetails } from '@models/webtoon';
import styles from './style.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

interface WebtoonAnalysisSectionProps {
  webtoon: WebtoonDetails;
}

// 새로운 분석 데이터 인터페이스 정의
interface WebtoonAnalytics {
  // 기본 통계
  basicStats: {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    averageRating: number;
    ratingCount: number;
    bookmarkCount: number;
  };
  
  // 인기도 지표
  popularityMetrics: {
    weeklyViews: number;
    weeklyGrowth: number;
    trendingScore: number;
    viralIndex: number;
  };
  
  // 독자 행동 분석
  readerBehavior: {
    averageReadTime: number;
    completionRate: number;
    reReadRate: number;
    shareRate: number;
    bingeReadRate: number;
  };
  
  // 독자 프로필
  readerProfile: {
    ageGroups: { age: string; percentage: number; color: string }[];
    genderDistribution: { gender: string; percentage: number; color: string }[];
    readingTime: { timeSlot: string; percentage: number }[];
    deviceUsage: { device: string; percentage: number; color: string }[];
  };
  
  // 콘텐츠 분석
  contentAnalysis: {
    genreTags: { tag: string; count: number; color: string }[];
    moodAnalysis: { mood: string; percentage: number; color: string }[];
    pacingScore: number;
    complexityLevel: string;
    emotionalIntensity: number;
  };
  
  // 성장 추이
  growthTrends: {
    weeklyViews: { week: string; views: number; trend: 'up' | 'down' | 'stable' }[];
    ratingTrend: { week: string; rating: number }[];
    engagementTrend: { week: string; engagement: number }[];
  };
  
  // 비교 분석
  comparisonData: {
    similarWebtoons: { title: string; similarity: number; rating: number }[];
    genreRanking: { rank: number; genre: string; score: number }[];
    platformPerformance: { platform: string; views: number; rating: number }[];
  };
  
  // 예측 분석
  predictions: {
    expectedViews: number;
    retentionPrediction: number;
    viralPotential: number;
    seasonality: { month: string; predictedViews: number }[];
  };
}

// 색상 팔레트
const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#48bb78',
  warning: '#ed8936',
  danger: '#e53e3e',
  info: '#4299e1',
  purple: '#9f7aea',
  pink: '#ed64a6',
  teal: '#38b2ac',
  orange: '#ed8936'
};

// 더미 데이터 생성
const generateAnalyticsData = (): WebtoonAnalytics => {
  return {
    basicStats: {
      totalViews: 2840000,
      totalLikes: 156000,
      totalComments: 23400,
      averageRating: 4.6,
      ratingCount: 12400,
      bookmarkCount: 89000
    },
    
    popularityMetrics: {
      weeklyViews: 125000,
      weeklyGrowth: 12.5,
      trendingScore: 8.7,
      viralIndex: 6.2
    },
    
    readerBehavior: {
      averageReadTime: 8.5,
      completionRate: 94.2,
      reReadRate: 23.1,
      shareRate: 7.8,
      bingeReadRate: 68.5
    },
    
    readerProfile: {
      ageGroups: [
        { age: '10대', percentage: 32, color: COLORS.pink },
        { age: '20대', percentage: 45, color: COLORS.primary },
        { age: '30대', percentage: 16, color: COLORS.teal },
        { age: '40대+', percentage: 7, color: COLORS.orange }
      ],
      genderDistribution: [
        { gender: '여성', percentage: 68, color: COLORS.pink },
        { gender: '남성', percentage: 32, color: COLORS.primary }
      ],
      readingTime: [
        { timeSlot: '오전', percentage: 15 },
        { timeSlot: '오후', percentage: 25 },
        { timeSlot: '저녁', percentage: 35 },
        { timeSlot: '심야', percentage: 25 }
      ],
      deviceUsage: [
        { device: '모바일', percentage: 78, color: COLORS.primary },
        { device: '태블릿', percentage: 15, color: COLORS.teal },
        { device: 'PC', percentage: 7, color: COLORS.orange }
      ]
    },
    
    contentAnalysis: {
      genreTags: [
        { tag: '로맨스', count: 1240, color: COLORS.pink },
        { tag: '힐링', count: 890, color: COLORS.success },
        { tag: '성장', count: 670, color: COLORS.info },
        { tag: '일상', count: 450, color: COLORS.teal },
        { tag: '감동', count: 320, color: COLORS.purple }
      ],
      moodAnalysis: [
        { mood: '따뜻함', percentage: 45, color: COLORS.success },
        { mood: '재미', percentage: 28, color: COLORS.warning },
        { mood: '감동', percentage: 18, color: COLORS.pink },
        { mood: '긴장', percentage: 9, color: COLORS.danger }
      ],
      pacingScore: 7.8,
      complexityLevel: '보통',
      emotionalIntensity: 6.5
    },
    
    growthTrends: {
      weeklyViews: Array.from({ length: 12 }, (_, i) => ({
        week: `${i + 1}주차`,
        views: Math.floor(Math.random() * 50000) + 80000,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })),
      ratingTrend: Array.from({ length: 12 }, (_, i) => ({
        week: `${i + 1}주차`,
        rating: 4.2 + Math.random() * 0.8
      })),
      engagementTrend: Array.from({ length: 12 }, (_, i) => ({
        week: `${i + 1}주차`,
        engagement: Math.floor(Math.random() * 20) + 60
      }))
    },
    
    comparisonData: {
      similarWebtoons: [
        { title: '비슷한 웹툰 A', similarity: 89, rating: 4.5 },
        { title: '비슷한 웹툰 B', similarity: 76, rating: 4.2 },
        { title: '비슷한 웹툰 C', similarity: 72, rating: 4.1 }
      ],
      genreRanking: [
        { rank: 1, genre: '로맨스', score: 9.2 },
        { rank: 2, genre: '일상', score: 8.7 },
        { rank: 3, genre: '성장', score: 8.1 }
      ],
      platformPerformance: [
        { platform: '네이버', views: 1800000, rating: 4.6 },
        { platform: '카카오', views: 1040000, rating: 4.4 }
      ]
    },
    
    predictions: {
      expectedViews: 3200000,
      retentionPrediction: 87.5,
      viralPotential: 7.8,
      seasonality: Array.from({ length: 12 }, (_, i) => ({
        month: `${i + 1}월`,
        predictedViews: Math.floor(Math.random() * 100000) + 200000
      }))
    }
  };
};

const WebtoonAnalysisSection: React.FC<WebtoonAnalysisSectionProps> = ({ webtoon }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'readers' | 'content' | 'trends' | 'comparison'>('overview');
  
  // 더미 데이터 사용
  const analyticsData = generateAnalyticsData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderOverviewTab = () => (
    <div className={styles.tabContent}>
      {/* 핵심 지표 */}
      <div className={styles.keyMetrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👁️</div>
          <div className={styles.metricContent}>
            <h3>총 조회수</h3>
            <p className={styles.metricValue}>{analyticsData.basicStats.totalViews.toLocaleString()}</p>
            <span className={styles.metricTrend}>+{analyticsData.popularityMetrics.weeklyGrowth}%</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>⭐</div>
          <div className={styles.metricContent}>
            <h3>평균 평점</h3>
            <p className={styles.metricValue}>{analyticsData.basicStats.averageRating}</p>
            <span className={styles.metricSubtext}>{analyticsData.basicStats.ratingCount.toLocaleString()}명 평가</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>❤️</div>
          <div className={styles.metricContent}>
            <h3>좋아요</h3>
            <p className={styles.metricValue}>{analyticsData.basicStats.totalLikes.toLocaleString()}</p>
            <span className={styles.metricSubtext}>찜 {analyticsData.basicStats.bookmarkCount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🔥</div>
          <div className={styles.metricContent}>
            <h3>트렌딩 점수</h3>
            <p className={styles.metricValue}>{analyticsData.popularityMetrics.trendingScore}/10</p>
            <span className={styles.metricTrend}>바이럴 지수 {analyticsData.popularityMetrics.viralIndex}</span>
          </div>
        </div>
      </div>

      {/* 독자 행동 분석 */}
      <div className={styles.behaviorSection}>
        <h3>독자 행동 분석</h3>
        <div className={styles.behaviorGrid}>
          <div className={styles.behaviorItem}>
            <span className={styles.behaviorLabel}>평균 독서 시간</span>
            <span className={styles.behaviorValue}>{analyticsData.readerBehavior.averageReadTime}분</span>
          </div>
          <div className={styles.behaviorItem}>
            <span className={styles.behaviorLabel}>완독률</span>
            <span className={styles.behaviorValue}>{analyticsData.readerBehavior.completionRate}%</span>
          </div>
          <div className={styles.behaviorItem}>
            <span className={styles.behaviorLabel}>재독률</span>
            <span className={styles.behaviorValue}>{analyticsData.readerBehavior.reReadRate}%</span>
          </div>
          <div className={styles.behaviorItem}>
            <span className={styles.behaviorLabel}>공유율</span>
            <span className={styles.behaviorValue}>{analyticsData.readerBehavior.shareRate}%</span>
          </div>
          <div className={styles.behaviorItem}>
            <span className={styles.behaviorLabel}>빙독률</span>
            <span className={styles.behaviorValue}>{analyticsData.readerBehavior.bingeReadRate}%</span>
          </div>
        </div>
      </div>

      {/* 콘텐츠 특성 */}
      <div className={styles.contentTraits}>
        <h3>콘텐츠 특성</h3>
        <div className={styles.traitsGrid}>
          <div className={styles.traitCard}>
            <h4>페이싱 점수</h4>
            <div className={styles.scoreBar}>
              <div 
                className={styles.scoreFill} 
                style={{ width: `${analyticsData.contentAnalysis.pacingScore * 10}%` }}
              ></div>
            </div>
            <span className={styles.scoreText}>{analyticsData.contentAnalysis.pacingScore}/10</span>
          </div>
          
          <div className={styles.traitCard}>
            <h4>복잡도</h4>
            <span className={styles.traitValue}>{analyticsData.contentAnalysis.complexityLevel}</span>
          </div>
          
          <div className={styles.traitCard}>
            <h4>감정 강도</h4>
            <div className={styles.scoreBar}>
              <div 
                className={styles.scoreFill} 
                style={{ width: `${analyticsData.contentAnalysis.emotionalIntensity * 10}%` }}
              ></div>
            </div>
            <span className={styles.scoreText}>{analyticsData.contentAnalysis.emotionalIntensity}/10</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReadersTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.chartGrid}>
        <div className={styles.chartCard}>
          <h3>연령대 분포</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analyticsData.readerProfile.ageGroups}
                dataKey="percentage"
                nameKey="age"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ age, percentage }) => `${age} ${percentage}%`}
              >
                {analyticsData.readerProfile.ageGroups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartCard}>
          <h3>성별 분포</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analyticsData.readerProfile.genderDistribution}
                dataKey="percentage"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ gender, percentage }) => `${gender} ${percentage}%`}
              >
                {analyticsData.readerProfile.genderDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartCard}>
          <h3>독서 시간대</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.readerProfile.readingTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="timeSlot" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="percentage" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartCard}>
          <h3>기기 사용률</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analyticsData.readerProfile.deviceUsage}
                dataKey="percentage"
                nameKey="device"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ device, percentage }) => `${device} ${percentage}%`}
              >
                {analyticsData.readerProfile.deviceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.chartGrid}>
        <div className={styles.chartCard}>
          <h3>인기 태그</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.contentAnalysis.genreTags}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="tag" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {analyticsData.contentAnalysis.genreTags.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartCard}>
          <h3>감정 분석</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analyticsData.contentAnalysis.moodAnalysis}
                dataKey="percentage"
                nameKey="mood"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ mood, percentage }) => `${mood} ${percentage}%`}
              >
                {analyticsData.contentAnalysis.moodAnalysis.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTrendsTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.chartCard}>
        <h3>주간 조회수 추이</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analyticsData.growthTrends.weeklyViews}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="views" 
              stroke={COLORS.primary} 
              fill={COLORS.primary} 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className={styles.chartGrid}>
        <div className={styles.chartCard}>
          <h3>평점 추이</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData.growthTrends.ratingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke={COLORS.warning} 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartCard}>
          <h3>참여도 추이</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData.growthTrends.engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke={COLORS.success} 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderComparisonTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.comparisonSection}>
        <h3>비슷한 웹툰</h3>
        <div className={styles.similarList}>
          {analyticsData.comparisonData.similarWebtoons.map((webtoon, index) => (
            <div key={index} className={styles.similarItem}>
              <div className={styles.similarInfo}>
                <h4>{webtoon.title}</h4>
                <span className={styles.similarityScore}>유사도 {webtoon.similarity}%</span>
              </div>
              <div className={styles.similarRating}>
                <span className={styles.ratingValue}>{webtoon.rating}</span>
                <span className={styles.ratingStars}>★★★★☆</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.comparisonSection}>
        <h3>장르 내 순위</h3>
        <div className={styles.rankingList}>
          {analyticsData.comparisonData.genreRanking.map((rank, index) => (
            <div key={index} className={styles.rankingItem}>
              <span className={styles.rankingNumber}>{rank.rank}</span>
              <span className={styles.rankingGenre}>{rank.genre}</span>
              <span className={styles.rankingScore}>{rank.score}/10</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.comparisonSection}>
        <h3>플랫폼별 성과</h3>
        <div className={styles.platformComparison}>
          {analyticsData.comparisonData.platformPerformance.map((platform, index) => (
            <div key={index} className={styles.platformItem}>
              <h4>{platform.platform}</h4>
              <div className={styles.platformStats}>
                <span>조회수: {platform.views.toLocaleString()}</span>
                <span>평점: {platform.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.analysisSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>웹툰 분석</h2>
        <p className={styles.sectionSubtitle}>독자들의 반응과 콘텐츠 성과를 분석해드립니다</p>
      </div>

      <div className={styles.tabNavigation}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 개요
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'readers' ? styles.active : ''}`}
          onClick={() => setActiveTab('readers')}
        >
          👥 독자
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'content' ? styles.active : ''}`}
          onClick={() => setActiveTab('content')}
        >
          📝 콘텐츠
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'trends' ? styles.active : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          📈 추이
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'comparison' ? styles.active : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          🔍 비교
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'readers' && renderReadersTab()}
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'trends' && renderTrendsTab()}
        {activeTab === 'comparison' && renderComparisonTab()}
      </div>
    </div>
  );
};

export default WebtoonAnalysisSection;
