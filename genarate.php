<?php
$css = 'css/simple-line-icons.css';
?>
<html>
<head>
    <link rel="stylesheet" href="<?php echo $css; ?>">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="https://github.com/thesabbir/simple-line-icons">Simple Line Icons</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="https://github.com/thesabbir/simple-line-icons">Get it!</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <?php
    $pattern = '/\.(icon-(?:\w+(?:-)?)+):before\s+{\s*content:\s*"(.+)";\s+}/';
    $css_file = file_get_contents($css);
    preg_match_all($pattern, $css_file, $icons, PREG_SET_ORDER);
    foreach ($icons as $icon) {
        echo '<div class="icon-preview-box col-xs-6 col-md-3 col-lg-3">
                <div class="preview">
                <a href="#" class="show-code" title="click to show css class name"><i class="' . $icon[1] . ' icons"></i><span class="name">' . str_replace('icon-', '', $icon[1]) . '</span> <code class="code-preview">.' . $icon[1] . '</code></a>
                </div>
            </div>';
    } ?>

</div>
<footer class="footer">
    <div class="container">
        <p class="pull-left">Brought to you by <a href="https://twitter.com/alreadysabbir">Sabbir</a> & <a href="https://github.com/thesabbir/simple-line-icons#contributors">Contributors</a></p>
        <p class="pull-right"><a href="https://github.com/thesabbir/simple-line-icons">Contribute!</a></p>
    </div>
</footer>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/app.js"></script>
</body>
</html>