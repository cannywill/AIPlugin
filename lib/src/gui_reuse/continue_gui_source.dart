class ContinueGuiSource {
  const ContinueGuiSource._({
    this.url,
    this.bundleDirectory,
    this.entrypoint = 'index.html',
  });

  const ContinueGuiSource.devServer({required Uri url}) : this._(url: url);

  const ContinueGuiSource.bundleDirectory({
    required String directory,
    String entrypoint = 'index.html',
  }) : this._(bundleDirectory: directory, entrypoint: entrypoint);

  final Uri? url;
  final String? bundleDirectory;
  final String entrypoint;

  bool get isDevServer => url != null;

  bool get isBundleDirectory => bundleDirectory != null;
}
