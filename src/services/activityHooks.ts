import { useQuery } from "@tanstack/react-query";
import { childService } from "./child.service";
import { screeningService } from "./screening.service";
import { pretestService } from "./pretest.service";
import { observationService } from "./observation.service";
import { posttestService } from "./posttest.service";

export interface Activity {
  id: string;
  type: "therapy" | "screening" | "pretest" | "posttest" | "observation";
  therapyId: string;
  childId: string;
  childName: string;
  description: string;
  createdAt: string;
  link: string;
}

interface ActivitiesData {
  activities: Activity[];
  totalChildren: number;
}

async function fetchActivities(therapies: any[]): Promise<ActivitiesData> {
  const activities: Activity[] = [];
  const uniqueChildren = new Set<string>();

  for (const therapy of therapies) {
    try {
      // Default child name if fetch fails
      let childName = "Unknown Child";

      // Try to fetch child info using service
      if (therapy.childId) {
        try {
          const child = await childService.getChildById(therapy.childId);

          if (child) {
            childName =
              child.fullname || `Child #${child.childOrder || "Unknown"}`;
          }
        } catch (error) {
          // Keep default childName if fetch fails
        }
      }

      uniqueChildren.add(therapy.childId);

      // Add therapy creation as activity
      activities.push({
        id: therapy._id,
        type: "therapy",
        therapyId: therapy._id,
        childId: therapy.childId,
        childName,
        description: "Therapy session created",
        createdAt: therapy.createdAt,
        link: `/counselor/therapy/${therapy._id}`,
      });

      // Fetch all assessments in parallel using services
      const [screening, pretest, observation, posttest] = await Promise.all([
        screeningService.getScreeningByTherapyId(therapy._id).catch(() => null),
        pretestService.getPretestByTherapyId(therapy._id).catch(() => null),
        observationService
          .getObservationByTherapyId(therapy._id)
          .catch(() => null),
        posttestService.getPosttestByTherapyId(therapy._id).catch(() => null),
      ]);

      // Add screening
      if (screening) {
        activities.push({
          id: screening._id,
          type: "screening",
          therapyId: therapy._id,
          childId: therapy.childId,
          childName,
          description: "Screening (DASS-21) completed",
          createdAt: screening.createdAt,
          link: `/counselor/assessments/screening/${screening._id}`,
        });
      }

      // Add pretest
      if (pretest) {
        activities.push({
          id: pretest._id,
          type: "pretest",
          therapyId: therapy._id,
          childId: therapy.childId,
          childName,
          description: "Pretest (SDQ) completed",
          createdAt: pretest.createdAt,
          link: `/counselor/assessments/pretest/${pretest._id}`,
        });
      }

      // Add observation
      if (observation) {
        activities.push({
          id: observation._id,
          type: "observation",
          therapyId: therapy._id,
          childId: therapy.childId,
          childName,
          description: "Observation notes recorded",
          createdAt: observation.createdAt,
          link: `/counselor/assessments/observation/${observation._id}`,
        });
      }

      // Add posttest
      if (posttest) {
        activities.push({
          id: posttest._id,
          type: "posttest",
          therapyId: therapy._id,
          childId: therapy.childId,
          childName,
          description: "Posttest (SDQ) completed",
          createdAt: posttest.createdAt,
          link: `/counselor/assessments/posttest/${posttest._id}`,
        });
      }
    } catch (error) {
      // Skip this therapy if there's any error
      continue;
    }
  }

  // Sort by date (most recent first)
  activities.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    activities,
    totalChildren: uniqueChildren.size,
  };
}

export function useActivities(therapies: any[] | undefined) {
  return useQuery({
    queryKey: ["activities", therapies?.map((t) => t._id).join(",")],
    queryFn: () => fetchActivities(therapies || []),
    enabled: !!therapies && therapies.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
