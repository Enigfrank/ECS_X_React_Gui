import React, { useState, useEffect } from 'react';
import './GUI.css';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Button,
  ToggleButton,
  Card,
  CardHeader,
  CardPreview,
  Text,
  Caption1,
  Title1,
  Title2,
  Subtitle1,
  Switch,
  TabList,
  Tab,
  Divider,
  Tooltip,
  makeStyles,
  tokens,
  shorthands,
  Badge,
  Toolbar,
  ToolbarButton,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  SplitButton,
  MenuButton,
} from '@fluentui/react-components';
import {
  CalendarLtr24Regular,
  CalendarLtr24Filled,
  Settings24Regular,
  Settings24Filled,
  Toolbox24Regular,
  Toolbox24Filled,
  Clock24Regular,
  ArrowSync24Regular,
  Timer24Regular,
  Pin24Regular,
  EyeOff24Regular,
  Rocket24Regular,
  Power24Regular,
  Wrench24Regular,
  ArrowCounterclockwise24Regular,
  Info24Regular,
  Dismiss24Regular,
  WindowDevTools24Regular,
  ChevronLeft24Regular,
  Checkmark24Regular,
  Add24Regular,
  MoreHorizontal24Regular,
  WeatherSunny24Regular,
  WeatherMoon24Regular,
  bundleIcon,
  CalendarLtr20Regular,
  CalendarLtr20Filled,
  Globe24Regular,
} from '@fluentui/react-icons';

const { ipcRenderer } = window.require('electron');

// Icon
const CalendarIcon = bundleIcon(CalendarLtr24Filled, CalendarLtr24Regular);
const SettingsIcon = bundleIcon(Settings24Filled, Settings24Regular);
const ToolsIcon = bundleIcon(Toolbox24Filled, Toolbox24Regular);

// Fluent样式 - Kimi
const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground3,
    fontFamily: tokens.fontFamilyBase,
  },
  sidebar: {
    width: '280px',
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: tokens.shadow8,
    zIndex: 100,
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sidebarContent: {
    flex: 1,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  sidebarFooter: {
    padding: '16px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'center',
  },
  navButton: {
    justifyContent: 'flex-start',
    gap: '12px',
    height: '44px',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  contentArea: {
    flex: 1,
    padding: '24px 32px',
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '1200px',
  },
  card: {
    minHeight: '140px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      boxShadow: tokens.shadow16,
      transform: 'translateY(-2px)',
    },
  },
  cardPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground}, ${tokens.colorBrandBackgroundHover})`,
  },
  settingsCard: {
    minHeight: 'auto',
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  settingInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  toolCard: {
    minHeight: '80px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      boxShadow: tokens.shadow16,
      transform: 'translateY(-2px)',
    },
  },
  toolCardWarning: {
    backgroundColor: tokens.colorPaletteOrangeBackground2,
  },
  toolCardDanger: {
    backgroundColor: tokens.colorPaletteRedBackground2,
  },
  toolCardInfo: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
  },
  toolCardDark: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
  },
  placeholderSection: {
    marginTop: '32px',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
    textAlign: 'center',
  },
  quickActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
    flexWrap: 'wrap',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    textAlign: 'center',
  },
});

const ReactGUI = () => {
  const styles = useStyles();
  const [currentView, setCurrentView] = useState('main');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    isDuringClassCountdown: false,
    isWindowAlwaysOnTop: false,
    isDuringClassHidden: false,
    isAutoLaunch: false,
    scheduleShutdown: false
  });

  useEffect(() => {
    ipcRenderer.on('init', (event, data) => {
      setSettings({
        isDuringClassCountdown: data.isDuringClassCountdown,
        isWindowAlwaysOnTop: data.isWindowAlwaysOnTop,
        isDuringClassHidden: data.isDuringClassHidden,
        isAutoLaunch: data.isAutoLaunch,
        scheduleShutdown: data.scheduleShutdown
      });
    });

    ipcRenderer.on('updateCheckbox', (event, data) => {
      if (data.id in settings) {
        setSettings(prev => ({
          ...prev,
          [data.id]: data.checked
        }));
      }
    });

    return () => {
      ipcRenderer.removeAllListeners('init');
      ipcRenderer.removeAllListeners('updateCheckbox');
    };
  }, []);

  const handleSettingChange = (settingName) => {
    const newValue = !settings[settingName];
    setSettings(prev => ({
      ...prev,
      [settingName]: newValue
    }));
    
    const ipcMessages = {
      isDuringClassCountdown: 'setClassCountdown',
      isWindowAlwaysOnTop: 'setWindowAlwaysOnTop',
      isDuringClassHidden: 'setDuringClassHidden',
      isAutoLaunch: 'setAutoLaunch',
      scheduleShutdown: 'setScheduleShutdown'
    };
    
    ipcRenderer.send(ipcMessages[settingName], newValue);
  };

  const handleButtonClick = (action, value) => {
    const ipcMessages = {
      week1: ['setWeekIndex', 0],
      week2: ['setWeekIndex', 1],
      openSetting: ['openSettingDialog'],
      correctTime: ['getTimeOffset', 0],
      toggleSchedule: ['setDayOffset'],
      manageShutdown: ['openShutdownManager'],
      devTools: ['openDevTools'],
      resetSettings: ['resetSettings'],
      moreInfo: ['showMoreInfo'],
      quitApp: ['quitApp']
    };
    
    const [message, ...args] = ipcMessages[action] || [action];
    ipcRenderer.send(message, ...(args.length ? args : []));
  };

  // 预留功能：快捷操作栏
  const QuickActions = () => (
    <div className={styles.quickActions}>
      <Tooltip content="打开官方文档" relationship="label">
        <Button
          icon={<Globe24Regular />}
          appearance="primary"
          onClick={() => ipcRenderer.send('open-external-link', 'https://doc.cavendi.top/')}
        >
          官方文档
        </Button>
      </Tooltip>
      <Tooltip content="导出课表" relationship="label">
        <Button icon={<CalendarLtr20Regular />}>
          导出课表(TODO)
        </Button>
      </Tooltip>
      <Tooltip content="分享课表" relationship="label">
        <Button icon={<ArrowSync24Regular />}>
          同步课表(TODO)
        </Button>
      </Tooltip>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Tooltip content="更多操作" relationship="label">
            <MenuButton icon={<MoreHorizontal24Regular />}>
              更多
            </MenuButton>
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CalendarLtr20Regular />}>导入课表(TODO)</MenuItem>
            <MenuItem icon={<Settings24Regular />}>高级设置(TODO)</MenuItem>
            <Divider />
            <MenuItem icon={<Info24Regular />}>关于(TODO)</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );

  // 其他工具栏
  const ToolsBar = () => (
    <div className={styles.toolsGrid} style={{ marginTop: '16px' }}>
      <Card
        className={styles.toolCard}
        onClick={() => handleButtonClick('devTools')}
        style={{ backgroundColor: tokens.colorPaletteOrangeBackground2 }}
      >
        <CardHeader
          header={<Text weight="semibold"><Wrench24Regular style={{ marginRight: '8px' }} />开发者工具</Text>}
          description={<Caption1>打开开发者调试工具</Caption1>}
        />
      </Card>

      <Card
        className={styles.toolCard}
        onClick={() => handleButtonClick('resetSettings')}
        style={{ backgroundColor: tokens.colorPaletteRedBackground2 }}
      >
        <CardHeader
          header={<Text weight="semibold"><ArrowCounterclockwise24Regular style={{ marginRight: '8px' }} />重置设置</Text>}
          description={<Caption1>恢复默认设置</Caption1>}
        />
      </Card>

      <Card
        className={styles.toolCard}
        onClick={() => handleButtonClick('moreInfo')}
        style={{ backgroundColor: tokens.colorPaletteBlueBackground2 }}
      >
        <CardHeader
          header={<Text weight="semibold"><Info24Regular style={{ marginRight: '8px' }} />更多信息</Text>}
          description={<Caption1>查看应用信息</Caption1>}
        />
      </Card>

      <Card
        className={styles.toolCard}
        onClick={() => handleButtonClick('quitApp')}
        style={{ backgroundColor: tokens.colorNeutralBackgroundStatic }}
      >
        <CardHeader
          header={<Text weight="semibold" style={{ color: 'white' }}><Dismiss24Regular style={{ marginRight: '8px' }} />退出程序</Text>}
          description={<Caption1 style={{ color: 'rgba(255,255,255,0.8)' }}>关闭应用</Caption1>}
        />
      </Card>
    </div>
  );

  // 预留功能：扩展区域
  const ExtensionPlaceholder = () => (
    <div className={styles.placeholderSection}>
      <Text size={400} weight="semibold" style={{ color: tokens.colorNeutralForeground3 }}>
        扩展功能区域(TODO)
      </Text>
      <Caption1 style={{ color: tokens.colorNeutralForeground3, marginTop: '8px', display: 'block' }}>
        插件、小组件和其他扩展将在这里显示
      </Caption1>
      <div style={{ marginTop: '16px' }}>
        <Button appearance="subtle" icon={<Add24Regular />}>
          添加扩展(TODO)
        </Button>
      </div>
    </div>
  );

  const MainView = () => (
    <>
      <Subtitle1 style={{ marginBottom: '16px' }}>功能选项</Subtitle1>
      <div className={styles.contentGrid}>
        <Card className={styles.card} onClick={() => handleButtonClick('week1')}>
          <CardPreview className={styles.cardPreview}>
            <CalendarLtr24Regular style={{ color: 'white', fontSize: '40px' }} />
          </CardPreview>
          <CardHeader
            header={<Text weight="semibold">单周</Text>}
            description={<Caption1>切换到单周课程表</Caption1>}
          />
        </Card>

        <Card className={styles.card} onClick={() => handleButtonClick('week2')}>
          <CardPreview className={styles.cardPreview}>
            <CalendarLtr24Regular style={{ color: 'white', fontSize: '40px' }} />
          </CardPreview>
          <CardHeader
            header={<Text weight="semibold">双周</Text>}
            description={<Caption1>切换到双周课程表</Caption1>}
          />
        </Card>

        <Card className={styles.card} onClick={() => handleButtonClick('openSetting')}>
          <CardPreview className={styles.cardPreview}>
            <Settings24Regular style={{ color: 'white', fontSize: '40px' }} />
          </CardPreview>
          <CardHeader
            header={<Text weight="semibold">配置课表</Text>}
            description={<Caption1>临时调整课程信息</Caption1>}
          />
        </Card>

        <Card className={styles.card} onClick={() => handleButtonClick('correctTime')}>
          <CardPreview className={styles.cardPreview}>
            <Clock24Regular style={{ color: 'white', fontSize: '40px' }} />
          </CardPreview>
          <CardHeader
            header={<Text weight="semibold">矫正计时</Text>}
            description={<Caption1>校准系统时间偏移</Caption1>}
          />
        </Card>

        <Card className={styles.card} onClick={() => handleButtonClick('toggleSchedule')}>
          <CardPreview className={styles.cardPreview}>
            <ArrowSync24Regular style={{ color: 'white', fontSize: '40px' }} />
          </CardPreview>
          <CardHeader
            header={<Text weight="semibold">切换日程</Text>}
            description={<Caption1>调休适用.....</Caption1>}
          />
        </Card>

        <Card className={styles.card} onClick={() => handleButtonClick('manageShutdown')}>
          <CardPreview className={styles.cardPreview}>
            <Power24Regular style={{ color: 'white', fontSize: '40px' }} />
          </CardPreview>
          <CardHeader
            header={<Text weight="semibold">管理定时关机</Text>}
            description={<Caption1>设置自动关机时间</Caption1>}
          />
        </Card>
      </div>

      <QuickActions />
      <ToolsBar />
      <ExtensionPlaceholder />
    </>
  );

  const SettingsView = () => {
    const settingItems = [
      { id: 'isDuringClassCountdown', icon: <Timer24Regular />, label: '课上计时', desc: '在课程进行中显示倒计时' },
      { id: 'isWindowAlwaysOnTop', icon: <Pin24Regular />, label: '窗口置顶', desc: '保持窗口始终在最前端' },
      { id: 'isDuringClassHidden', icon: <EyeOff24Regular />, label: '上课隐藏', desc: '上课期间自动隐藏窗口' },
      { id: 'isAutoLaunch', icon: <Rocket24Regular />, label: '开机启动', desc: '系统启动时自动运行' },
      { id: 'scheduleShutdown', icon: <Power24Regular />, label: '定时关机', desc: '启用自动关机功能' },
    ];

    return (
      <>
        <Subtitle1 style={{ marginBottom: '16px' }}>设置选项</Subtitle1>
        <Card className={styles.settingsCard}>
          {settingItems.map((item, index) => (
            <div key={item.id} className={styles.settingItem}>
              <div className={styles.settingInfo}>
                {item.icon}
                <div>
                  <Text weight="semibold">{item.label}</Text>
                  <Caption1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                    {item.desc}
                  </Caption1>
                </div>
              </div>
              <Switch
                checked={settings[item.id]}
                onChange={() => handleSettingChange(item.id)}
              />
            </div>
          ))}
        </Card>
        
        {/* 预留：高级设置区域 */}
        <Subtitle1 style={{ margin: '24px 0 16px' }}>高级设置(未实现)</Subtitle1>
        <Card className={styles.settingsCard}>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <Settings24Regular />
              <div>
                <Text weight="semibold">主题设置(TODO)</Text>
                <Caption1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                  自定义界面外观
                </Caption1>
              </div>
            </div>
            <Button appearance="secondary">配置</Button>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <Clock24Regular />
              <div>
                <Text weight="semibold">通知设置(TODO)</Text>
                <Caption1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                  管理提醒和通知
                </Caption1>
              </div>
            </div>
            <Button appearance="secondary">配置</Button>
          </div>
        </Card>
      </>
    );
  };

  // 其他工具视图（预留功能）
  const ToolsView = () => (
    <>
      {/* 预留：日志和诊断区域 */}
      <Subtitle1 style={{ margin: '24px 0 16px' }}>系统诊断(N/A)</Subtitle1>
      <Card>
        <div style={{ padding: '20px' }}>
          <Text>应用运行日志和系统诊断信息将在这里显示</Text>
          <div style={{ marginTop: '12px' }}>
            <Button icon={<WindowDevTools24Regular />}>查看日志(N/A)</Button>
          </div>
        </div>
      </Card>
    </>
  );

  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <div className={styles.root}>
        {/* 侧边栏 */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <CalendarLtr24Regular style={{ color: tokens.colorBrandForeground1, fontSize: '32px' }} />
            <div>
              <Text weight="semibold" size={500}>课程表管理</Text>
              <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>v1.0.0</Caption1>
            </div>
          </div>
          
          <div className={styles.sidebarContent}>
            <Button
              className={styles.navButton}
              appearance={currentView === 'main' ? 'primary' : 'subtle'}
              icon={<CalendarIcon />}
              onClick={() => setCurrentView('main')}
            >
              功能选项
            </Button>
            <Button
              className={styles.navButton}
              appearance={currentView === 'settings' ? 'primary' : 'subtle'}
              icon={<SettingsIcon />}
              onClick={() => setCurrentView('settings')}
            >
              设置选项
            </Button>
            <Button
              className={styles.navButton}
              appearance={currentView === 'tools' ? 'primary' : 'subtle'}
              icon={<ToolsIcon />}
              onClick={() => setCurrentView('tools')}
            >
              其他工具
            </Button>
          </div>
          
          <div className={styles.sidebarFooter}>
            <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
              © {new Date().getFullYear()} Enigfrank 版权所有
            </Caption1>
          </div>
        </div>

        {/* 主内容区 */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Title2>仪表盘</Title2>
              <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                Made By Enigfrank
              </Caption1>
            </div>
            <div className={styles.headerRight}>
              <Tooltip content={isDarkMode ? '切换到浅色模式' : '切换到深色模式'} relationship="label">
                <ToggleButton
                  icon={isDarkMode ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
                  checked={isDarkMode}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  appearance="subtle"
                />
              </Tooltip>
            </div>
          </div>
          
          <div className={styles.contentArea}>
            {currentView === 'main' && <MainView />}
            {currentView === 'settings' && <SettingsView />}
            {currentView === 'tools' && <ToolsView />}
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default ReactGUI;
