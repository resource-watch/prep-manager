// routes.js
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= ADMIN ROUTES =====================
routes.add('admin_home', '/admin', 'admin/Data');
// DATA
routes.add('admin_data', '/admin/data/:tab?', 'admin/Data');
routes.add('admin_data_detail', '/admin/data/:tab/:id/:subtab?', 'admin/DataDetail');
// DASHBOARDS
routes.add('admin_dashboards', '/admin/dashboards/:tab?', 'admin/Dashboards');
routes.add('admin_dashboards_detail', '/admin/dashboards/:tab/:id/:subtab?', 'admin/DashboardsDetail');
// PARTNERS
routes.add('admin_partners', '/admin/partners/:tab?', 'admin/Partners');
routes.add('admin_partners_detail', '/admin/partners/:tab/:id/:subtab?', 'admin/PartnersDetail');
// PAGES
routes.add('admin_pages', '/admin/pages/:tab?', 'admin/Pages');
routes.add('admin_pages_detail', '/admin/pages/:tab/:id/:subtab?', 'admin/PagesDetail');
// TOOLS
routes.add('admin_tools', '/admin/tools/:tab?', 'admin/Tools');
routes.add('admin_tools_detail', '/admin/tools/:tab/:id/:subtab?', 'admin/ToolsDetail');
// INDICATORS
routes.add('admin_indicators', '/admin/indicators/:tab?', 'admin/Indicators');
routes.add('admin_indicators_detail', '/admin/indicators/:tab/:id/:subtab?', 'admin/IndicatorsDetail');
// MY RW
routes.add('admin_myprep', '/myprep/:tab?/:subtab?', 'admin/MyPREP');
routes.add('admin_myprep_detail', '/myprep-detail/:tab?/:id?/:subtab?', 'admin/MyPREPDetail');
// INSIGHTS
routes.add('admin_insights', '/admin/insights/:tab?', 'admin/Insights');
routes.add('admin_insights_detail', '/admin/insights/:tab/:id/:subtab?', 'admin/InsightsDetail');

// ========================= APP ROUTES =====================
routes.add('home', '/', 'app/Home');

// ---- ABOUT ----
routes.add('about', '/about', 'app/About');
routes.add('about_partners', '/about/partners', 'app/Partners');
routes.add('partner', '/about/partners/:id', 'app/PartnerDetail');

// ----- DATA -----
// routes.add('data', '/data', 'app/Explore'); // TODO: create the data page
routes.add('explore', '/data/explore', 'app/Explore');
routes.add('explore_detail', '/data/explore/:id', 'app/ExploreDetail');
routes.add('explore_detail_beta', '/data/explore/:id/beta', 'app/ExploreDetailBeta');
routes.add('pulse', '/data/pulse', 'app/Pulse');
routes.add('dashboards', '/data/dashboards/', 'app/Dashboards');
routes.add('dashboards_detail', '/data/dashboards/:slug', 'app/DashboardsDetail');

// ----- INSIGHTS -----
routes.add('insights', '/blog', 'app/Insights');
routes.add('insights_detail', '/blog/:slug', 'app/InsightsDetail');

// ----- GET INVOLVED -----
routes.add('get_involved', '/get-involved', 'app/GetInvolved');
routes.add('get_involved_detail', '/get-involved/:id', 'app/GetInvolvedDetail');

// ------ MY RW ------------
// routes.add('myprep', '/myprep/:tab?/:subtab?', 'app/MyPREP');
// routes.add('myprep_detail', '/myprep-detail/:tab?/:id?/:subtab?', 'app/MyPREPDetail');

// ------ EMBED -------------
routes.add('embed_widget', '/embed/widget/:id', 'app/embed/EmbedWidget');
routes.add('embed_text', '/embed/text/:id', 'app/embed/EmbedText');
routes.add('embed_map', '/embed/map/:id', 'app/embed/EmbedMap');
routes.add('embed_dataset', '/embed/dataset/:id', 'app/embed/EmbedDataset');
routes.add('embed_layer', '/embed/layers', 'app/embed/EmbedLayer');
routes.add('embed_table', '/embed/table', 'app/embed/EmbedTable');
routes.add('embed_dashboard', '/embed/dashboards/:slug', 'app/embed/EmbedDashboard');

// ------ TERMS && POLICY -------------
routes.add('terms-of-service', '/terms-of-service', 'app/Terms');
routes.add('privacy-policy', '/privacy-policy', 'app/Policy');


module.exports = routes;
