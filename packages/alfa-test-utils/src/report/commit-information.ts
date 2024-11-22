/**
 * Global structure of a version control metadata.
 *
 * @remarks
 * This is mostly modelled after git, but should work fine with other VCS like
 * svn or cvs. Notably, only the branch name is mandatory.
 *
 * @public
 */
export interface CommitInformation {
  /**
   * The origin's URL. This may vary depending on whether the repository was cloned
   * using `http` or `ssh` protocol.
   */
  Origin: string | undefined;
  /**
   * The name of the current branch.
   */
  BranchName: string;
  /**
   * The hash of the latest commit.
   */
  CommitHash: string | undefined;
  /**
   * The name of the author of the latest commit.
   */
  Author: string | undefined;
  /**
   * The email of the author of the latest commit.
   */
  Email: string | undefined;
  /**
   * The timestamp of the latest commit.
   */
  CommitTimestamp: string | undefined;
  /**
   * The message of the latest commit.
   */
  Message: string | undefined;
}

