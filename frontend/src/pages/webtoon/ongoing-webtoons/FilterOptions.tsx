import React, { useState } from 'react';
import styles from './style.module.css';

interface FilterOptionsProps<PlatformType = string, DayType = string> {
  PLATFORM_LABELS: Record<string, string>;
  DAYS: DayType[];
  DAY_LABELS: Record<string, string>;
  onChangeSelectedPlatforms: (platforms: PlatformType[]) => void;
  onChangeSelectedDay: (day: DayType | null) => void;
}

function FilterOptions<PlatformType = string, DayType = string>({
  PLATFORM_LABELS,
  DAYS,
  DAY_LABELS,
  onChangeSelectedPlatforms,
  onChangeSelectedDay,
}: FilterOptionsProps<PlatformType, DayType>) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);

  const handleSelectAllPlatforms = () => {
    if (selectedPlatforms.length === Object.keys(PLATFORM_LABELS).length) {
      setSelectedPlatforms([]);
      onChangeSelectedPlatforms([]);
    } else {
      const all = Object.keys(PLATFORM_LABELS) as PlatformType[];
      setSelectedPlatforms(all);
      onChangeSelectedPlatforms(all);
    }
  };

  const handlePlatformChange = (platform: PlatformType) => {
    let next: PlatformType[];
    if (selectedPlatforms.includes(platform)) {
      next = selectedPlatforms.filter(p => p !== platform);
    } else {
      next = [...selectedPlatforms, platform];
    }
    setSelectedPlatforms(next);
    onChangeSelectedPlatforms(next);
  };

  const handleDayChange = (day: DayType) => {
    const next = selectedDay === day ? null : day;
    setSelectedDay(next);
    onChangeSelectedDay(next);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <div className={styles.platformButtons}>
          <button
            className={`${styles.filterOption} ${selectedPlatforms.length === Object.keys(PLATFORM_LABELS).length ? styles.active : ''}`}
            onClick={handleSelectAllPlatforms}
          >
            전체
          </button>
          {Object.keys(PLATFORM_LABELS).map((platform) => (
            <button
              key={platform}
              className={`${styles.filterOption} ${selectedPlatforms.includes(platform as PlatformType) ? styles.active : ''}`}
              onClick={() => handlePlatformChange(platform as PlatformType)}
            >
              {PLATFORM_LABELS[platform]}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.filterGroup}>
        <div className={styles.dayButtons}>
          {DAYS.map((day) => (
            <button
              key={day as string}
              className={`${styles.filterOption} ${selectedDay === day ? styles.active : ''}`}
              onClick={() => handleDayChange(day)}
            >
              {DAY_LABELS[day as string]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterOptions; 